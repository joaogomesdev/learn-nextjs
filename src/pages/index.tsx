import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Title } from '../styles/pages/Home';

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <Title>Hello World</Title>
    </div>
  );
}
