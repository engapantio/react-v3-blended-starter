import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import Home from './page';

const HomeS = async () => {
  const queryClient = new QueryClient();
  const rest = {
    to: '',
    from: '',
    amount: 15,
  };

  await queryClient.prefetchQuery({
    queryKey: ['query', rest],
    queryFn: () => exchangeCurrency(rest),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
};

export default HomeS;
