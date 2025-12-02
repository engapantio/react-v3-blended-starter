'use client';
import styles from './ExchangeInfo.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function ExchangeInfo() {
  const { exchangeInfo } = useCurrencyStore();

  if (!exchangeInfo) return null;

  const { amount, from, to, rate, result } = exchangeInfo;

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <p className={styles.details}>
          <span className={styles.accent}>{amount} </span>
          <span className={styles.accent}>{from} </span>
          in <span className={styles.accent}>{to}</span>
        </p>

        <p className={styles.details}>
          at the rate of
          <span className={styles.accent}> {rate.toFixed(4)}</span>
        </p>

        <p className={styles.title}>
          {result.toFixed(2)} {to}
        </p>
      </div>
    </div>
  );
}
