import styled from '@emotion/styled';
import loginPic from '@/assets/images/login-pic.png';

const LoginStyle = styled.div(() => ({
   backgroundImage: `url(${loginPic?.src})`,
   backgroundPosition: 'center center',
   backgroundRepeat: 'no-repeat',
   backgroundSize: 'cover',

   '#container': {
      display: 'grid',
      gridTemplateRows: 'repeat(3 , auto) 1fr',
   },
}));

export default LoginStyle;
