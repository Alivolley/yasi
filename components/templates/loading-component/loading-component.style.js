import styled from '@emotion/styled';

const LoadingComponentStyle = styled.div(() => ({
   '#spinner': {
      position: 'relative',
      width: '56px',
      height: '56px',
   },
   '#spinner > div': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '13px solid rgba(203, 184, 221, 0.4)',
      position: 'absolute',
      top: '0',
      left: '0',
      animation: 'spinner-g7vlvwmd 0.65s linear infinite',
      zIndex: '0',
   },
   '#spinner > div::before': {
      content: '""',
      height: '13px',
      width: '13px',
      borderRadius: '50%',
      background: '#cbb8dd',
      position: 'absolute',
      top: '50%',
      animation: 'spinner-h1vps1md 1.3s infinite reverse steps(1)',
      transform: 'translate(calc(2 * var(--translate-2)), calc(var(--translate) * 1%))',
      zIndex: '1',
   },
   '#spinner > div:nth-of-type(1)': {
      '--translate': '-50',
      '--translate-2': 'calc(56px / 8)',
   },
   '#spinner > div:nth-of-type(1)::before': {
      right: '0',
   },
   '#spinner > div:nth-of-type(2)': {
      '--translate': '50',
      '--translate-2': 'calc(-56px / 8)',
      animationDelay: '0.65s',
      animationDirection: 'reverse',
      transform: 'translate(21.5px, 0)',
   },
   '#spinner > div:nth-of-type(2)::before': {
      left: '0',
      transform: 'translate(calc(-56px / 4), -50%)',
      animationDirection: 'normal',
   },
   '@keyframes spinner-h1vps1md': {
      '0%': {
         opacity: '0',
      },
      '50%': {
         opacity: '1',
      },
   },
   '@keyframes spinner-g7vlvwmd': {
      from: {
         transform: 'translate(calc(var(--translate) * 1%), 0) translate(calc(var(--translate-2)), 0) rotate(0deg)',
      },
      to: {
         transform: 'translate(calc(var(--translate) * 1%), 0) translate(calc(var(--translate-2)), 0) rotate(360deg)',
      },
   },
}));

export default LoadingComponentStyle;
