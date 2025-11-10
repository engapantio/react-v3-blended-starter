'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

import css from './page.module.css';

export default function Home() {
  const state = useCurrencyStore();

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info={true}
            error={false}
            title="What currencies do you want to exchange?🙂"
            top={true}
            bottom={false}
          />
          <ExchangeForm />
          {state.exchangeInfo && (
            <ExchangeInfo
              to={state.exchangeInfo.to}
              from={state.exchangeInfo.from}
              amount={state.exchangeInfo.amount}
              result={state.exchangeInfo.result}
              rate={state.exchangeInfo.rate}
            />
          )}
          {state.isError && (
            <Heading
              error={true}
              info={false}
              title="Something went wrong...😐 Check the data validity and try again!"
              top={false}
              bottom={true}
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
