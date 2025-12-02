'use client';

import Select from 'react-select';

import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function SelectRates() {
  const { baseCurrency, setBaseCurrency } = useCurrencyStore();

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          value: baseCurrency,
          label: baseCurrency,
        }}
        options={symbols}
        onChange={(option) => {
          if (option) setBaseCurrency(option.value);
        }}
        isSearchable
      />
    </div>
  );
}
