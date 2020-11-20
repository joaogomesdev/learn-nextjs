import SEO from '@/components/SEO';
import { GetServerSideProps } from 'next';
import Link from 'next/link'
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents';

import { client } from '@/lib/prismic'; 

import { Title } from '../styles/pages/Home';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
 
  return (
    <>
    <SEO 
      title="JoJoCommerce, your best ecommerce" 
      shouldExcludeTitleSuffix
      image="boost.png"
    />
    <section>
      <Title>Products</Title>

      <ul>
        {recommendedProducts.map(recommendedProduct => {
          return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}> 
                <a>
                  {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                </a>
                </Link>
              </li>
            )
        })}
      </ul>
    </section>
    
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
 
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);
  
  return { 
    props: {
        recommendedProducts: recommendedProducts.results,
    }
  }  
}