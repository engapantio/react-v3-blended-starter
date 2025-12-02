// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
} | null;


type CurrencyState = {
  baseCurrency: string;
  isLoading: boolean;
  isError: string | null;
  exchangeInfo: ExchangeInfo;
  rates: [string, number][];
  filter: string;
  hasHydrated: boolean;
  setHasHydrated: (hd: boolean) => void;
  setBaseCurrency: (currency: string) => void;
  setExchangeInfo: (info: ExchangeInfo) => void;
  setIsLoading: (ld: boolean) => void;
  setIsError: (er: string | null) => void;
  setFilter: (filter: string) => void;
  setRates: (rates:[string, number][]) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      exchangeInfo: null,
      isLoading: false,
      isError: null,
      rates: [],
      filter: '',
      hasHydrated: false,
      setHasHydrated: (hd) => set({ hasHydrated: hd }),
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setExchangeInfo: (info) => set({ exchangeInfo: info }),
      setIsLoading: (ld) => set({ isLoading: ld }),
      setIsError: (er) => set({ isError: er }),
      setRates: (rates) => set({ rates }),
      setFilter: (filter) => set({ filter })
    }),
    {
      // Ключ у localStorage
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
