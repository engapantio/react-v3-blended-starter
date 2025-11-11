'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { Credentials } from '@/lib/service/exchangeAPI';
import styles from './ExchangeForm.module.css';

export default function ExchangeForm() {
  const [rest, setRest] = useState<Credentials>({ to: '', from: '', amount: 0 });
  // ✅ Get store functions
  const storeSetExchangeInfo = useCurrencyStore((state) => state.setExchangeInfo);
  const storeSetIsLoading = useCurrencyStore((state) => state.setIsLoading);
  const storeSetIsError = useCurrencyStore((state) => state.setIsError);

  // ✅ Memoize with useCallback to get stable references
  const setExchangeInfo = useCallback(storeSetExchangeInfo, []);
  const setIsLoading = useCallback(storeSetIsLoading, []);
  const setIsError = useCallback(storeSetIsError, []);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['exchange', rest.from, rest.to, rest.amount],
    queryFn: () => exchangeCurrency(rest),
    refetchOnMount: false,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    enabled: rest.from !== '',
  });

  // ✅ Update store when query succeeds
  useEffect(() => {
    if (isSuccess && data) {
      setExchangeInfo(data);
      setIsLoading(false);
      setIsError(false);
    }
  }, [isSuccess, data, setExchangeInfo, setIsLoading, setIsError]);

  // ✅ Handle errors
  useEffect(() => {
    if (isError) {
      setExchangeInfo(null);
      setIsLoading(false);
      setIsError(true);
    }
  }, [isError, setExchangeInfo, setIsLoading, setIsError]);

  // ✅ Sync loading state
  useEffect(() => {
    if (!isSuccess && !isError) {
      setIsLoading(isLoading);
    }
  }, [isLoading, isSuccess, isError, setIsLoading]);

  const handleSubmit = (formData: FormData) => {
    const currency = formData.get('currency') as string;
    const res = currency.split(' ');

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
