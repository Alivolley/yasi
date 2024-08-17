import { useState } from 'react';

// MUI
import { Checkbox } from '@mui/material';

// Assets
import ColorComponentStyle from './colorComponent.style';

function ColorComponent({ colorsAndCount, setColorsAndCount, detail }) {
   const [checkValue, setCheckValue] = useState(false);

   const matchItem = colorsAndCount?.find(item => item?.color === detail?.color);

   return (
      <ColorComponentStyle className="flex flex-col items-center gap-2">
         <div
            style={{ backgroundColor: detail?.color }}
            className="size-5 rounded-full border border-solid border-[#00000048]"
         />
         {(checkValue || !!matchItem) && (
            <div className="mt-2 flex h-6 w-9 items-center justify-center">
               <input
                  type="number"
                  min={0}
                  className="size-full rounded-[4px] border border-solid border-[#00000048] text-center text-[11px] outline-none"
                  value={matchItem?.stock}
                  onChange={e => {
                     const newItems = colorsAndCount.filter(item => item?.color !== detail?.color);
                     setColorsAndCount([...newItems, { color: detail?.color, stock: e.target.value }]);
                  }}
               />
            </div>
         )}
         <Checkbox
            value={checkValue || !!matchItem}
            onChange={(e, newValue) => {
               if (newValue) {
                  setColorsAndCount(prev =>
                     prev ? [...prev, { color: detail?.color, stock: 0 }] : [{ color: detail?.color, stock: 0 }]
                  );
               } else {
                  setColorsAndCount(prev => {
                     const filteredPrev = prev?.filter(item => item?.color !== detail?.color);
                     return filteredPrev;
                  });
               }
               setCheckValue(newValue);
            }}
            checked={checkValue || !!matchItem}
            size="small"
         />
      </ColorComponentStyle>
   );
}

export default ColorComponent;
