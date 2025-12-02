'use client';

import { useEffect } from 'react';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import { getUserInfo } from '@/lib/service/opencagedataApi';

export default function GeolocationChecker() {
  const { hasHydrated, baseCurrency, setBaseCurrency } = useCurrencyStore();

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    // const options = {
    //   enableHighAccuracy: true,
    //   timeout: 5000,
    //   maximumAge: 0,
    // };

    const success = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      try {
        const currency = await getUserInfo(latitude, longitude);
        setBaseCurrency(currency);
      } catch (error) {
        console.error('Error fetching currency:', error);
        setBaseCurrency('USD');
      }
    };

    const error = () => {
      setBaseCurrency('USD');
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setBaseCurrency('USD');
    }
  }, [hasHydrated, baseCurrency, setBaseCurrency]);

  return null;
}
