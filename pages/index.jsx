import Head from 'next/head';
import axiosInstance from '@/configs/axiosInstance';

// Components
import Banner from '@/components/pages/home/banner/banner';
import Categories from '@/components/pages/home/categories/categories';
import OffersBanner from '@/components/pages/home/offers-banner/offers-banner';
import Introduce from '@/components/pages/home/Introduce/Introduce';
import Newest from '@/components/pages/home/newest/newest';
import BoldProducts from '@/components/pages/home/bold-products/bold-products';
import BestSellers from '@/components/pages/home/best-sellers/best-sellers';

export default function Home({ categoryList, newestList, bestSellersList, boldProducts }) {
   return (
      <div>
         <Head>
            <title>یــاسی</title>
         </Head>
         <Banner />
         <Categories detail={categoryList} />
         <OffersBanner />
         <Introduce />
         <Newest detail={newestList} />
         <BoldProducts detail={boldProducts} />
         <BestSellers detail={bestSellersList} />
      </div>
   );
}

export async function getStaticProps() {
   const categoryList = await axiosInstance(`store/categories/list_create/`).then(res => res.data);
   const newestList = await axiosInstance(`store/products/list_create/?ordering=created`).then(res => res.data);
   const bestSellersList = await axiosInstance(`store/products/list_create/?ordering=sales`).then(res => res.data);
   const boldProducts = await axiosInstance(`store/products/list_create/?is_bold=true&page_size=3`).then(
      res => res.data
   );

   return {
      props: {
         categoryList,
         newestList,
         bestSellersList,
         boldProducts,
      },
      revalidate: 300,
   };
}
