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
            custom400: '400px',
            customSm: '600px',
            customMd: '900px',
            custom1100: '1100px',
            customLg: '1200px',
            customXl: '1400px',
         },

         colors: {
            customPink: '#a888c7',
            customPink2: '#b194cd',
            customPink3: '#cbb8dd',
            customPinkLow: '#eee7f4',
            customPinkHigh: '#765f8b',
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
