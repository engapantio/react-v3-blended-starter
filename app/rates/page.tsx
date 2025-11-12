'use client';

import { Wave } from 'react-animated-text';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import RatesList from '@/components/RatesList/RatesList';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { latestRates } from '@/lib/service/exchangeAPI';
import css from './RatesPage.module.css';
import { useEffect } from 'react';
import { Rate } from '@/lib/stores/currencyStore';

export default function RatesPage() {
  const setRates = useCurrencyStore((state) => state.setRates);
  const isError = useCurrencyStore((state) => state.isError);
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);

  const { data } = useQuery({
    queryKey: ['rates', baseCurrency],
    queryFn: () => latestRates(baseCurrency),
    placeholderData: keepPreviousData,
  });

  const filteredRates: Rate[] = data
    ? data
        .filter(([key]) => key !== baseCurrency)
        .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }))
    : [];

  useEffect(() => {
    setRates(filteredRates);
  }, [filteredRates, baseCurrency]);
  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info={true}
            bottom={false}
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />
          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}

          {isError && (
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
