import styled from '@emotion/styled';

const MobileMenuStyle = styled.div(() => ({
   '#scroll': {
      '::-webkit-scrollbar': {
         width: '5px',
         height: '5px',
      },

      '::-webkit-scrollbar-track': {
         background: '#ffffff',
      },

      '::-webkit-scrollbar-thumb': {
         background: '#d14f4d',
         borderRadius: '3px',
      },

      '::-webkit-scrollbar-thumb:hover': {
         background: '#df8482',
      },
   },
}));

export default MobileMenuStyle;
