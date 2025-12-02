'use client';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { convertCurrency } from '@/lib/service/exchangeAPI';
import styles from './ExchangeForm.module.css';

const INPUT_REGEX = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;

export default function ExchangeForm() {
  const [rest, setRest] = useState('');

  const { setExchangeInfo, setIsError } = useCurrencyStore();

  // // ✅ Memoize with useCallback to get stable references
  // const setExchangeInfo = useCallback(storeSetExchangeInfo, []);
  // const setIsLoading = useCallback(storeSetIsLoading, []);
  // const setIsError = useCallback(storeSetIsError, []);

  // const { data, isLoading, isError, isSuccess } = useQuery({
  //   queryKey: ['exchange', rest.from, rest.to, rest.amount],
  //   queryFn: () => exchangeCurrency(rest),
  //   refetchOnMount: false,
  //   staleTime: 10000,
  //   refetchOnWindowFocus: false,
  //   enabled: rest.from !== '',
  // });

  // // ✅ Update store when query succeeds
  // useEffect(() => {
  //   if (isSuccess && data) {
  //     setExchangeInfo(data);
  //     setIsLoading(false);
  //     setIsError(false);
  //   }
  // }, [isSuccess, data, setExchangeInfo, setIsLoading, setIsError]);

  // // ✅ Handle errors
  // useEffect(() => {
  //   if (isError) {
  //     setExchangeInfo(null);
  //     setIsLoading(false);
  //     setIsError(true);
  //   }
  // }, [isError, setExchangeInfo, setIsLoading, setIsError]);

  // // ✅ Sync loading state
  // useEffect(() => {
  //   if (!isSuccess && !isError) {
  //     setIsLoading(isLoading);
  //   }
  // }, [isLoading, isSuccess, isError, setIsLoading]);

  // const handleSubmit = (formData: FormData) => {
  //   const currency = formData.get('currency') as string;
  //   const res = currency.split(' ');

  //   setRest(() => {
  //     return {
  //       to: res[3],
  //       from: res[1],
  //       amount: Number(res[0]),
  //     };
  //   });
  // };

  const mutation = useMutation({
    mutationFn: (credentials: { from: string; to: string; amount: number }) =>
      convertCurrency(credentials),
    onSuccess: (data) => {
      setExchangeInfo(data);
    },
    onError: () => {
      setIsError('Failed to convert currency. Please try again');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!INPUT_REGEX.test(rest)) {
      setIsError('Wrong format. Please use: 15 USD in UAH');
      return;
    }

    const parts = rest.split(' ');
    const amount = parseFloat(parts[0]);
    const from = parts[1];
    const to = parts[3];
    mutation.mutate({ from, to, amount });
  };

  //   setIsLoading(true);
  //   setIsError(null);

  //   try {
  //     const result = await convertCurrency({ from, to, amount });
  //     setExchangeInfo(result);
  //   } catch (error) {
  //     setIsError('Conversion error. Try again.');
  //     console.log(error);
  //     setExchangeInfo(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit" disabled={mutation.isPending}>
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        value={rest}
        //pattern={INPUT_REGEX}
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        onChange={(e) => setRest(e.target.value)}
        name="currency"
        required
      />
    </form>
  );
}
