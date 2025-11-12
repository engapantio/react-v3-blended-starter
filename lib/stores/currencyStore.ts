// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
};
export type Rate = {
  key: string;
  value: string;
}

export type CurrencyState = {
  baseCurrency: string;
  isLoading: boolean;
  isError: boolean | null;
  exchangeInfo: ExchangeInfo | null;
  rates: Rate[];
  hasHydrated: boolean;
  setHasHydrated: (st: boolean) => void;
  setBaseCurrency: (currency: string) => void;
  setExchangeInfo: (info: ExchangeInfo | null) => void;
  setIsLoading: (st: boolean) => void;
  setIsError: (er: boolean) => void;
  setRates: (rt: Rate[]) => void;
};

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      exchangeInfo: null,
      isLoading: false,
      isError: null,
      rates: [],
      hasHydrated: false,
      setHasHydrated: (st) => set({ hasHydrated: st }),
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setExchangeInfo: (info) => set({ exchangeInfo: info }),
      setIsLoading: (st) => set({ isLoading: st }),
      setIsError: (er) => set({ isError: er }),
      setRates: (rt) => set({ rates: rt }),
    }),
    {
      // Ключ у localStorage
      name: 'base-currency',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
