import { useState, useEffect } from 'react';

function CountdownLogin({ initialCount = 0, onComplete = () => {} }) {
   const [count, setCount] = useState(initialCount);

   // eslint-disable-next-line consistent-return
   useEffect(() => {
      if (count > 0) {
         const timer = setTimeout(() => {
            setCount(prev => prev - 1);
         }, 1000);

         return () => clearTimeout(timer);
      }
      onComplete();
   }, [count, onComplete]);

   const formatTime = time => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
   };

   return <p className="mt-4 text-xs tracking-[1px] text-textColor">{formatTime(count)} تا ارسال مجدد کد</p>;
}

export default CountdownLogin;
