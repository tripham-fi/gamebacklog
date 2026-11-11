import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CURRENCIES, CurrencyCode } from "../constants/currencies";
import { fetchRate } from "../api/currency";

type CurrencyContextType = {
  currency: CurrencyCode;
  rate: number;
  isLoading: boolean;
  error: string | null;
  setCurrency: (c: CurrencyCode) => void;
  format: (price: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  rate: 1,
  isLoading: false,
  error: null,
  setCurrency: () => {},
  format: (price) => `${price.toFixed(2)} USD`,
});

function formatPrice(usd: number, rate: number, code: CurrencyCode): string {
  const amount = (usd * rate).toFixed(2);
  const info = CURRENCIES.find((c) => c.code === code);
  const symbol = info?.symbol ?? code;
  if (symbol.length === 1) {
    return `${symbol}${amount}`;
  }
  return `${amount} ${code}`;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [rate, setRate] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchRate(currency)
      .then((r) => {
        if (!cancelled) setRate(r);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load exchange rate");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [currency]);

  const format = useCallback(
    (price: number) => formatPrice(price, rate, currency),
    [rate, currency],
  );
  return (
    <CurrencyContext.Provider
      value={{
        currency,
        error,
        format,
        isLoading,
        rate,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
