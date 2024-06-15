import styled from '@emotion/styled';

const TableStyle = styled.div(({ isSideBarOpen }) => ({
   transition: 'all 0.5s',
   maxWidth: '100%',
   width: '100%',

   '@media (min-width: 900px)': {
      maxWidth: isSideBarOpen ? 'calc(100vw - 443px)' : 'calc(100vw - 253px)',
      width: isSideBarOpen ? 'calc(100vw - 443px)' : 'calc(100vw - 253px)',
   },

   overflow: 'auto',

   table: {
      width: '100%',
      maxWidth: '100%',
      borderCollapse: 'separate',

      tr: {
         whiteSpace: 'nowrap',
      },

      '& td, th': {
         padding: '20px',
         borderBottom: '1px solid #E4EAF0',
         verticalAlign: 'middle',
      },

      'tr td:nth-of-type(odd)': {
         color: '#7E8AAB',
         fontWeight: 'bold',
      },
   },
}));

export default TableStyle;
