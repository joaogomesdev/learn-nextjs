import { useState } from 'react';
import { useRouter } from 'next/router';
import PrismicDom from 'prismic-dom';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Document } from 'prismic-javascript/types/documents';
import { client } from '@/lib/prismic';

interface ProductProps {
  product: Document;
}

export default function Product({product}: ProductProps ) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  
  return(
    <div>
        <h1>
        {PrismicDom.RichText.asText(product.data.title)}
        </h1>

        <img   src={product.data.thumbnail.url} width="400" alt=""/>

        <div dangerouslySetInnerHTML={{__html: PrismicDom.RichText.asHtml(product.data.description)}}></div>

        <p>{product.data.price}</p>

    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug) , {});

  return { 
    props: {
      product,
    },
    revalidate: 5,
  }
}

