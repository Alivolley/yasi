import styled from '@emotion/styled';
import homeBannerMobile from '@/assets/images/home-banner-mobile.png';
import homeBannerDesktop from '@/assets/images/home-banner-desktop.png';

const BannerStyle = styled.section(() => ({
   backgroundImage: `url(${homeBannerMobile?.src})`,
   backgroundPosition: 'center center',
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',

   '@media (min-width: 600px)': {
      backgroundImage: `url(${homeBannerDesktop?.src})`,
   },
}));

export default BannerStyle;
