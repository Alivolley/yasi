import styled from '@emotion/styled';

const ColorComponentStyle = styled.div(() => ({
   '& input[type="number"]': {
      MozAppearance: 'textfield',
      appearance: 'textfield',
      '&::-webkit-inner-spin-button': {
         WebkitAppearance: 'none',
         appearance: 'none',
      },
   },
}));

export default ColorComponentStyle;
