import styled from '@emotion/styled';

const BannerStyle = styled.section(() => ({
   '& .swiper-pagination-bullet': {
      backgroundColor: 'white !important',
      opacity: '1 !important',
      width: '18px',
      borderRadius: '5px',
   },
   '& .swiper-pagination-bullet-active': {
      backgroundColor: '#5C368B !important',
      width: '47px',
   },
}));

export default BannerStyle;
