import Link from 'next/link';
import styled from '@emotion/styled';

const CategoryCardStyle = styled(Link)(() => ({
   ':hover': {
      '#categoryImage': {
         backgroundColor: '#FCF7F7',
      },
   },
}));
export default CategoryCardStyle;
