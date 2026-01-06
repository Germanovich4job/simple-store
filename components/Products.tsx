import Head from 'next/head';
import ProductList from '../components/ProductList';

export default function ProductsPage() {
  return (
    <div className="container">
      <Head>
        <title>Product List</title>
        <meta name="description" content="List of available products." />
      </Head>

      <main>
        <ProductList />
      </main>
    </div>
  );