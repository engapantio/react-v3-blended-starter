'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { Credentials } from '@/lib/service/exchangeAPI';
import styles from './ExchangeForm.module.css';

export default function ExchangeForm() {
  const [rest, setRest] = useState<Credentials>({ to: '', from: '', amount: 0 });
  const state = useCurrencyStore();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['query', rest],
    queryFn: () => exchangeCurrency(rest),
    enabled: rest.from !== '',
  });
  if (isSuccess) {
    state.setBaseCurrency(data.from);
    state.setExchangeInfo(data.result);
    state.setIsLoading(isLoading);
    state.setIsError(isError);
  }

  const handleSubmit = (formData: FormData) => {
    const currency = formData.get('currency') as string;
    const res = currency.split(' ');
    console.log(res);
    setRest(() => {
      return {
        to: res[3],
        from: res[1],
        amount: Number(res[0]),
      };
    });
  };
  return (
    <form className={styles.form} action={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
