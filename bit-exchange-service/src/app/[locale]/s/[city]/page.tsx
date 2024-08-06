'use client';

// import { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';
import SearchForm from '@/components/SearchForm';
import SearchMain from '@/components/SearchMain';

// export const metadata: Metadata = {
//   title: 'Search Page',
//   description: 'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
// }

export default function SearchPage({ params: { locale, city, symbol } }) {
  const searchParams = useSearchParams();
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  return (
    <div className="bg-white">
      <SearchForm locale={locale} city={city} symbol={symbol} minPrice={minPrice} maxPrice={maxPrice} />
      {/*<SearchMain city={city} symbol={symbol} minPrice={minPrice} maxPrice={maxPrice} />*/}
    </div>
  );
}
