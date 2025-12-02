'use cient';

import styles from './Filter.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function Filter() {
  const { filter, setFilter } = useCurrencyStore();
  return (
    <input
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={e => setFilter(e.target.value)}
    />
  );
}
