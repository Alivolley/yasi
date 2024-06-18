import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Configs
import axiosInstance from '@/configs/axiosInstance';

// Assets
import faqPic from '@/assets/images/faq.png';

function Faqs({ questionsList }) {
   return (
      <div className="bg-[#f6f3f9] px-8 py-[60px] customMd:px-16">
         <Head>
            <title>یاسی - سوالات متداول</title>
         </Head>

         <div className="flex items-start gap-5">
            <div className="hidden h-[435px] w-[300px] shrink-0 -scale-x-100 border-s border-solid border-[#E4EAF0] ps-5 customMd:block">
               <Image src={faqPic} alt="faq" className="size-full" />
            </div>
            <div className="bg-white px-1 py-5 max-customMd:w-full customMd:grow customMd:px-10">
               {questionsList?.map(item => (
                  <Accordion sx={{ boxShadow: 'none' }} key={item?.id}>
                     <AccordionSummary
                        expandIcon={
                           <div className="flex items-center justify-center rounded-md bg-customPinkLow p-1 text-customPinkHigh">
                              <ExpandMoreIcon />
                           </div>
                        }
                     >
                        <div className="flex items-center gap-2">
                           <div className="size-3 shrink-0 rounded-full bg-customPink3" />
                           <pre className="text-sm font-bold customMd:text-base">{item?.question}</pre>
                        </div>
                     </AccordionSummary>
                     <AccordionDetails>
                        <pre className="text-sm">{item?.answer}</pre>
                     </AccordionDetails>
                  </Accordion>
               ))}
            </div>
         </div>

         <div className="mt-16 flex flex-col items-center justify-center gap-3">
            <p className="text-sm font-bold customMd:text-base">پاسخ سوال خود را پیدا نکردید ؟</p>
            <p className="text-xs text-textColor">با پشتیبانی ما ارتباط بگیرید</p>
            <Link href="/contactUs">
               <Button color="customPink2" variant="contained" className="!px-10">
                  تماس با ما
               </Button>
            </Link>
         </div>
      </div>
   );
}

export default Faqs;

export async function getStaticProps() {
   const questionsList = await axiosInstance(`accounts/questions/list_create/`).then(res => res.data);

   return {
      props: {
         questionsList,
      },
      revalidate: 300,
   };
}
