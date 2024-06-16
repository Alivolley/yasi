const getDesignTokens = () => ({
   direction: 'rtl',

   typography: {
      fontFamily: 'dana',
   },

   palette: {
      secondary: {
         main: '#a888c7',
      },
      customPink: {
         main: '#a888c7',
      },
      customPink2: {
         main: '#b194cd',
      },
      customPink3: {
         main: '#cbb8dd',
      },
      customPinkLow: {
         main: '#eee7f4',
      },
      customPinkHigh: {
         main: '#765f8b',
      },
      white: {
         main: '#ffffff',
      },
      black: {
         main: '#000000',
      },
      borderColor: {
         main: '#BDCEDE',
      },
      textColor: {
         main: '#626E94',
      },
      customBlue: {
         main: '#385E8A',
      },
      customGold: {
         main: '#FF9F1C',
      },
   },

   components: {
      MuiFab: {
         styleOverrides: {
            root: {
               boxShadow: 'none',
               zIndex: 1,
               '&:hover': {
                  boxShadow: 'none',
                  color: '#977ab3',
               },
            },
         },
      },

      MuiIconButton: {
         styleOverrides: {
            root: {
               '&:hover': {
                  color: '#977ab3',
               },
            },
         },
      },

      MuiButton: {
         styleOverrides: {
            root: props => ({
               boxShadow: 'none',
               textTransform: 'none',
               '&:hover': {
                  boxShadow: 'none',
                  ...(props?.ownerState?.variant !== 'contained'
                     ? {
                          backgroundColor: 'transparent',
                          color: '#977ab3',
                       }
                     : {
                          backgroundColor: '#655277',
                          color: '#fff',
                       }),
               },
            }),
         },
      },

      MuiOutlinedInput: {
         styleOverrides: {
            root: {
               borderRadius: '10px',
            },
         },
      },

      MuiDialog: {
         styleOverrides: {
            root: {
               fontFamily: 'dana',
            },
         },
      },

      MuiDrawer: {
         styleOverrides: {
            root: {
               fontFamily: 'dana',
            },
         },
      },

      MuiTooltip: {
         styleOverrides: {
            tooltip: {
               backgroundColor: '#F5F8FC',
               padding: '5px',
               border: '1px solid #DFEBF1',
               boxShadow: '0px 5px 20px 0px #B0C3D31A',
            },
         },
      },
   },
});

export default getDesignTokens;
