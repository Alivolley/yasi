import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Recharts
import {
   BarChart,
   Bar,
   Rectangle,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   LineChart,
   Line,
} from 'recharts';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LoadingButton } from '@mui/lab';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { CircularProgress } from '@mui/material';

// Icons
import DownloadIcon from '@mui/icons-material/Download';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';

// Apis
import useGetReports from '@/apis/pAdmin/reports/useGetReports';
import axiosInstance from '@/configs/axiosInstance';

function CustomTooltipDaily({ active, payload }) {
   if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
         <div className="flex flex-col gap-1 rounded-lg border border-solid border-textColor bg-white p-2 text-sm shadow-sm">
            {Object.keys(data).map(key =>
               key === 'count' ? (
                  <p key={key} className="order-1">
                     {`تعداد: ${data[key]}`}
                  </p>
               ) : key === 'title' ? (
                  <p key={key} className="order-2">
                     {`نام: ${data[key]}`}
                  </p>
               ) : null
            )}
         </div>
      );
   }

   return null;
}

function CustomTooltipMonthly({ active, payload }) {
   if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
         <div className="flex flex-col gap-1 rounded-lg border border-solid border-textColor bg-white p-2 text-sm shadow-sm">
            {Object.keys(data).map(key =>
               key === 'count' ? (
                  <p key={key} className="order-1">
                     {`تعداد: ${data[key]}`}
                  </p>
               ) : key === 'income' ? (
                  <p key={key} className="order-2">
                     {`فروش: ${Number(data[key]).toLocaleString()} تومان`}
                  </p>
               ) : key === 'day' ? (
                  <p key={key} className="order-3">
                     {`روز: ${data[key]}`}
                  </p>
               ) : null
            )}
         </div>
      );
   }

   return null;
}

function Reports() {
   const currentDate = new Date();
   currentDate.setHours(0, 0, 0, 0);
   const todayTimestamp = Math.floor(currentDate.getTime() / 1000);

   const [chosenFilter, setChosenFilter] = useState(todayTimestamp);
   const [chosenPeriod, setChosenPeriod] = useState('daily');
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [isDownloading, setIsDownloading] = useState(false);
   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

   const userInfo = useSelector(state => state?.userInfoReducer);

   const { back, pathname } = useRouter();

   const { data: reportsData, isLoading: reportsIsLoading } = useGetReports(
      chosenFilter === 1 || chosenFilter === 12 ? chosenFilter : '',
      chosenFilter !== 1 && chosenFilter !== 12 ? chosenFilter : ''
   );

   const downloadFileHandler = () => {
      if (startDate && endDate) {
         setIsDownloading(true);
         axiosInstance(
            `accounts/report/?excel=True&start=${Math.floor(startDate / 1000)}&end=${Math.floor(endDate / 1000)}`
         )
            .then(res => {
               window.location.href = `${baseURL}${res?.data?.link}`;
               setTimeout(() => {
                  setIsDownloading(false);
               }, 1500);
            })
            .catch(() => setIsDownloading(false));
      } else {
         toast.info('لطفا هر دو تاریخ را برای دانلود انتخاب کنید');
      }
   };

   useEffect(() => {
      if (userInfo?.phone_number && !userInfo?.is_admin) {
         back();
         toast.warn('شما اجازه دسترسی به این صفحه را ندارید');
      }
   }, [userInfo, pathname]);

   return (
      <AdminLayout>
         <Head>
            <title>یاسی هوم - پنل ادمین</title>
         </Head>
         <div className="flex flex-col gap-2 customSm:flex-row customSm:items-center customSm:gap-4">
            <button
               type="button"
               onClick={() => {
                  setChosenFilter(todayTimestamp);
                  setChosenPeriod('daily');
               }}
               className={`h-full flex-1 cursor-pointer rounded-sm border border-solid border-[#DFEBF1] bg-white 
               py-4 text-center text-base customSm:py-6 customMd:text-xl font-dana`}
            >
               <p className={chosenFilter === todayTimestamp ? 'font-bold text-black' : 'text-[#98A2B2]'}>
                  فروش روزانه
               </p>
            </button>

            <button
               type="button"
               onClick={() => {
                  setChosenFilter(1);
                  setChosenPeriod('monthly');
               }}
               className={`h-full flex-1 cursor-pointer rounded-sm border border-solid border-[#DFEBF1] bg-white 
               py-4 text-center text-base customSm:py-6 customMd:text-xl font-dana`}
            >
               <p className={chosenFilter === 1 ? 'font-bold text-black' : 'text-[#98A2B2]'}>فروش ماهانه</p>
            </button>

            <button
               type="button"
               onClick={() => {
                  setChosenFilter(12);
                  setChosenPeriod('annual');
               }}
               className={`h-full flex-1 cursor-pointer rounded-sm border border-solid border-[#DFEBF1] bg-white 
               py-4 text-center text-base customSm:py-6 customMd:text-xl font-dana`}
            >
               <p className={chosenFilter === 12 ? 'font-bold text-black' : 'text-[#98A2B2]'}>فروش سالانه</p>
            </button>
         </div>

         <div className="my-10 h-[500px] rounded-sm bg-white py-10 pe-5 ps-5 customMd:ps-10">
            {reportsIsLoading ? (
               <div className="my-16 flex w-full items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : chosenPeriod === 'daily' ? (
               <div className="mx-auto h-full max-w-xl">
                  {reportsData?.data?.length ? (
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reportsData?.data}>
                           <CartesianGrid />
                           <XAxis dataKey="title" fontSize={12} />
                           <YAxis tick={{ dx: -35 }} fontSize={13} />
                           <Tooltip content={<CustomTooltipDaily />} />
                           <Bar dataKey="count" fill="#FFA3A1" activeBar={<Rectangle fill="#D14F4D" />} />
                        </BarChart>
                     </ResponsiveContainer>
                  ) : (
                     <p className="mt-7 text-center text-lg font-bold">دیتایی وجود ندارد</p>
                  )}
               </div>
            ) : chosenPeriod === 'monthly' ? (
               <div className="h-full">
                  {reportsData?.data?.length ? (
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={reportsData?.data}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="day" fontSize={12} />
                           <YAxis tick={{ dx: -35 }} fontSize={13} />
                           <Tooltip content={<CustomTooltipMonthly />} />
                           <Line type="monotone" dataKey="count" stroke="#D14F4D" dot={false} />
                           <Line type="monotone" dataKey="income" stroke="#385E8A" dot={false} />
                        </LineChart>
                     </ResponsiveContainer>
                  ) : (
                     <p className="mt-7 text-center text-lg font-bold">دیتایی وجود ندارد</p>
                  )}
               </div>
            ) : chosenPeriod === 'annual' ? (
               <div className="h-full">
                  {reportsData?.data?.length ? (
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={reportsData?.data}>
                           <CartesianGrid strokeDasharray="3 3" />
                           <XAxis dataKey="day" fontSize={12} />
                           <YAxis tick={{ dx: -35 }} fontSize={13} />
                           <Tooltip content={<CustomTooltipMonthly />} />
                           <Line type="monotone" dataKey="count" stroke="#51d14d" dot={false} />
                           <Line type="monotone" dataKey="income" stroke="#57388a" dot={false} />
                        </LineChart>
                     </ResponsiveContainer>
                  ) : (
                     <p className="mt-7 text-center text-lg font-bold">دیتایی وجود ندارد</p>
                  )}
               </div>
            ) : null}
         </div>

         <div className="mt-20 flex flex-col flex-wrap items-center justify-between gap-6 customSm:flex-row">
            <div className="flex flex-col items-center gap-3 customSm:flex-row customSm:gap-5">
               <p>از</p>
               <div>
                  <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                     <DatePicker value={startDate} onChange={e => setStartDate(e.valueOf())} />
                  </LocalizationProvider>
               </div>
               <p>تا</p>
               <div>
                  <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                     <DatePicker value={endDate} onChange={e => setEndDate(e.valueOf())} />
                  </LocalizationProvider>
               </div>
            </div>
            <LoadingButton
               startIcon={<DownloadIcon />}
               variant="contained"
               color="customPinkHigh"
               className="!w-[220px] !text-white customSm:!w-auto"
               onClick={downloadFileHandler}
               size="large"
               loading={isDownloading}
            >
               دانلود فایل
            </LoadingButton>
         </div>
      </AdminLayout>
   );
}

export default Reports;

export async function getServerSideProps(context) {
   const { req } = context;
   const accessToken = req?.cookies?.yasi_accessToken;
   const refreshToken = req?.cookies?.yasi_refreshToken;

   if (accessToken && refreshToken) {
      return {
         props: {},
      };
   }

   return {
      redirect: {
         destination: '/login',
      },
   };
}
