// MUI
import { Accordion, AccordionDetails, AccordionSummary, Fab } from '@mui/material';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// data
import colorPallet from '@/data/color-pallet';

function ColorsFilter({ chosenColor, setChosenColor }) {
   return (
      <div className="mt-6 border-t border-solid border-[#E4EAF0] pt-6">
         <div className="flex items-center justify-between">
            <p>رنگ :</p>
            <div className="flex flex-wrap items-center gap-6">
               <div
                  className={
                     chosenColor === '0029FF'
                        ? 'size-10 shrink-0 rounded-full border-2 border-solid border-black p-1'
                        : 'size-10'
                  }
               >
                  <Fab
                     className="!h-full !min-h-0 !w-full !rounded-full"
                     sx={{ backgroundColor: '#0029FF', ':hover': { backgroundColor: '#0029FF' } }}
                     onClick={() => setChosenColor(prev => (prev === '0029FF' ? '' : '0029FF'))}
                  />
               </div>
               <div
                  className={
                     chosenColor === 'ee2b2b'
                        ? 'size-10 shrink-0 rounded-full border-2 border-solid border-black p-1'
                        : 'size-10'
                  }
               >
                  <Fab
                     className="!h-full !min-h-0 !w-full !rounded-full"
                     sx={{ backgroundColor: '#ee2b2b', ':hover': { backgroundColor: '#ee2b2b' } }}
                     onClick={() => setChosenColor(prev => (prev === 'ee2b2b' ? '' : 'ee2b2b'))}
                  />
               </div>
               <div
                  className={
                     chosenColor === '4ef34e'
                        ? 'size-10 shrink-0 rounded-full border-2 border-solid border-black p-1'
                        : 'size-10'
                  }
               >
                  <Fab
                     className="!h-full !min-h-0 !w-full !rounded-full"
                     sx={{ backgroundColor: '#4ef34e', ':hover': { backgroundColor: '#4ef34e' } }}
                     onClick={() => setChosenColor(prev => (prev === '4ef34e' ? '' : '4ef34e'))}
                  />
               </div>
               <div
                  className={
                     chosenColor === 'EE7CFF'
                        ? 'size-10 shrink-0 rounded-full border-2 border-solid border-black p-1'
                        : 'size-10'
                  }
               >
                  <Fab
                     className="!h-full !min-h-0 !w-full !rounded-full"
                     sx={{ backgroundColor: '#EE7CFF', ':hover': { backgroundColor: '#EE7CFF' } }}
                     onClick={() => setChosenColor(prev => (prev === 'EE7CFF' ? '' : 'EE7CFF'))}
                  />
               </div>
            </div>
         </div>
         <div className="mt-2">
            <Accordion sx={{ boxShadow: 'none' }}>
               <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />} sx={{ padding: '0 !important' }}>
                  <p className="text-xs">رنگ های بیشتر</p>
               </AccordionSummary>
               <AccordionDetails>
                  <div className="flex flex-wrap items-center gap-6">
                     {colorPallet.map(item => (
                        <div
                           key={item.id}
                           className={
                              chosenColor === item.color.slice(1)
                                 ? 'size-10 shrink-0 rounded-full border-2 border-solid border-black p-1'
                                 : 'size-10'
                           }
                        >
                           <Fab
                              className="!h-full !min-h-0 !w-full !rounded-full !border !border-solid !border-[#00000048]"
                              sx={{ backgroundColor: item.color, ':hover': { backgroundColor: item.color } }}
                              onClick={() =>
                                 setChosenColor(prev => (prev === item.color.slice(1) ? '' : item.color.slice(1)))
                              }
                           />
                        </div>
                     ))}
                  </div>
               </AccordionDetails>
            </Accordion>
         </div>
      </div>
   );
}

export default ColorsFilter;
