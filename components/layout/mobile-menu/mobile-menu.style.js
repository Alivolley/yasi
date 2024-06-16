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
         background: '#765f8b',
         borderRadius: '3px',
      },

      '::-webkit-scrollbar-thumb:hover': {
         background: '#b9a0d2',
      },
   },
}));

export default MobileMenuStyle;
