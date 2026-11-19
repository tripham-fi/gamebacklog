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
import { getSetting, setSetting } from "../db/settings";

type CurrencyContextType = {
  currency: CurrencyCode;
  rate: number;
  isLoading: boolean;
  error: string | null;
  setCurrency: (c: CurrencyCode) => Promise<void>;
  format: (price: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  rate: 1,
  isLoading: false,
  error: null,
  setCurrency: async () => {},
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

async function saveCurrency(code: CurrencyCode, rate: number) {
  await Promise.all([
    setSetting("currency", code),
    setSetting("rate", String(rate)),
  ]);
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rate, setRate] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [code, savedRate] = await Promise.all([
          getSetting("currency"),
          getSetting("rate"),
        ]);

        const valid = CURRENCIES.some((c) => c.code === code);
        const savedRateNumber = Number(savedRate);

        if (!valid || !(savedRateNumber > 0)) return;
        const savedCode = code as CurrencyCode;

        if (!cancelled) {
          setCurrencyState(savedCode);
          setRate(savedRateNumber);
        }

        if (savedCode !== "USD") {
          try {
            const fresh = await fetchRate(savedCode);
            if (!cancelled) setRate(fresh);
            await saveCurrency(savedCode, fresh);
          } catch (e) {
            if (!cancelled) setError("Could not refresh exchange rate");
          }
        }
      } catch (e) {
        if (!cancelled) setError("Could not load currency");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback(async (code: CurrencyCode) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetchRate(code);
      setCurrencyState(code);
      setRate(r);
      try {
        await saveCurrency(code, r);
      } catch (e) {
        console.warn("Could not save currency", e);
      }
    } catch {
      setError("Could not load exchange rate");
    } finally {
      setLoading(false);
    }
  }, []);

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
