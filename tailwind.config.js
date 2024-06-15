/** @type {import('tailwindcss').Config} */
module.exports = {
   corePlugins: {
      preflight: false,
   },
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         '@layer base': {
            button: [],
         },

         screens: {
            customXs: '350px',
            customSm: '600px',
            customMd: '900px',
            custom1100: '1100px',
            customLg: '1200px',
            customXl: '1400px',
         },

         colors: {
            customPink: '#FFA3A1',
            customPink2: '#FFD7D6',
            customPink3: '#F7C1CA',
            customPinkLow: '#FFEEED',
            customPinkHigh: '#D14F4D',
            borderColor: '#BDCEDE',
            textColor: '#626E94',
            customBlue: '#385E8A',
            customGold: '#FF9F1C',
         },

         fontFamily: {
            dana: 'dana',
            poppins: 'poppins',
            rubik: 'rubik',
         },
         borderRadius: {
            10: '10px',
         },
         fontSize: {
            10: '10px',
         },
      },
   },
   plugins: [],
};
