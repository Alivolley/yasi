import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

function RtlProvider({ children }) {
   const cacheRtl = createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
   });

   return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}

export default RtlProvider;
