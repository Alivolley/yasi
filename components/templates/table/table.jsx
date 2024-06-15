import { useSelector } from 'react-redux';

// MUI
import { CircularProgress, FormControl, MenuItem, Pagination, Select } from '@mui/material';

// Assets
import TableStyle from './table.style';

function Table({
   columns,
   rows,
   pageStatus = 1,
   setPageStatus,
   loading = false,
   totalPages,
   totalObjects,
   countValue,
   setCountValue,
}) {
   const isSideBarOpen = useSelector(state => state?.pAdminSideBarStatus);
   const tableRowCalculator = (limit, page, index) => limit * page - (limit - 1) + index;

   return (
      <>
         <TableStyle isSideBarOpen={isSideBarOpen}>
            {loading ? (
               <div className="mt-10 flex items-center justify-center p-10">
                  <CircularProgress color="customPink" />
               </div>
            ) : rows?.length ? (
               <table>
                  <thead className="bg-[#f5f8fc]">
                     <tr>
                        {columns?.map(column => (
                           <th
                              key={column?.id || crypto.randomUUID()}
                              className="text-center text-sm font-bold text-customBlue"
                           >
                              {column?.title}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {rows?.map((row, rowIndex) => (
                        <tr key={row?.id || crypto.randomUUID()}>
                           {columns?.map((column, colIndex) =>
                              colIndex === 0 ? (
                                 <td key={column?.id || crypto.randomUUID()} className="text-center text-sm">
                                    {tableRowCalculator(countValue, pageStatus, rowIndex)}
                                 </td>
                              ) : (
                                 <td key={column?.id || crypto.randomUUID()} className="text-center text-sm">
                                    {!column?.renderCell ? row?.[column?.key] : column?.renderCell(row)}
                                 </td>
                              )
                           )}
                        </tr>
                     ))}
                  </tbody>
               </table>
            ) : (
               <p className="py-20 text-center font-bold">جدول خالی میباشد</p>
            )}
         </TableStyle>
         {pageStatus && setPageStatus && totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-between gap-7">
               <div className="flex items-center gap-2">
                  <p className="text-sm text-textColor">نمایش</p>

                  <div className="min-w-[70px]">
                     <FormControl fullWidth size="small">
                        <Select
                           value={countValue}
                           onChange={e => {
                              setPageStatus(1);
                              setCountValue(e.target.value);
                           }}
                           color="customPink"
                        >
                           <MenuItem value={6}>6</MenuItem>
                           <MenuItem value={8}>8</MenuItem>
                           <MenuItem value={10}>10</MenuItem>
                           <MenuItem value={12}>12</MenuItem>
                           <MenuItem value={14}>14</MenuItem>
                        </Select>
                     </FormControl>
                  </div>
                  <p className="whitespace-nowrap text-sm text-textColor">از {totalObjects} عدد</p>
               </div>
               <Pagination
                  count={totalPages}
                  color="customPinkHigh"
                  onChange={(_, value) => setPageStatus(value)}
                  size="small"
                  page={pageStatus}
                  sx={{ '& .Mui-selected': { color: 'white !important' } }}
               />
            </div>
         )}
      </>
   );
}

export default Table;
