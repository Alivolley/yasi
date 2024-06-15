const getDesignTokens = () => ({
   direction: 'rtl',

   typography: {
      fontFamily: 'dana',
   },

   palette: {
      customPink: {
         main: '#FFA3A1',
      },
      customPink2: {
         main: '#FFD7D6',
      },
      customPink3: {
         main: '#F7C1CA',
      },
      customPinkLow: {
         main: '#FFEEED',
      },
      customPinkHigh: {
         main: '#D14F4D',
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
                  color: '#B1302E',
               },
            },
         },
      },

      MuiIconButton: {
         styleOverrides: {
            root: {
               '&:hover': {
                  color: '#B1302E',
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
                          color: '#B1302E',
                       }
                     : {
                          backgroundColor: '#D1706F',
                          color: '#fff !important',
                       }),
               },
            }),
         },
      },

      MuiTab: {
         styleOverrides: {
            root: props => ({
               ...(props['aria-selected'] &&
                  props.custompinkhigh && {
                     color: '#B1302E !important',
                  }),
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
