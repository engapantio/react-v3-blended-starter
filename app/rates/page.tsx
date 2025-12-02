'use client';

import { Wave } from 'react-animated-text';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import RatesList from '@/components/RatesList/RatesList';
import Filter from '@/components/Filter/Filter';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { getLatestRates } from '@/lib/service/exchangeAPI';
import css from './RatesPage.module.css';

export default function RatesPage() {
  const { baseCurrency, filter, setRates, setIsLoading, setIsError } = useCurrencyStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['rates', baseCurrency],
    queryFn: () => getLatestRates(baseCurrency),
  });

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const data = await getLatestRates(baseCurrency);
        setRates(data);
      } catch (error) {
        console.log(error);
        setIsError('Error to load rates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency, setIsError, setIsLoading, setRates]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return null;

  const filteredRates = data
    .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
    .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info={true}
            error={false}
            bottom={false}
            top={true}
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          <Filter />
          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}

          {error && (
            <Heading
              top={false}
              bottom={true}
              info={false}
              error={true}
              title="Something went wrong...😐 We cannot show current rates!"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
