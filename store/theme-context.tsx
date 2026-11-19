import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme, themes } from "../constants/styles";
import { useColorScheme } from "react-native";
import { getSetting, setSetting } from "../db/settings";

type Preference = "system" | "light" | "dark";
const PREFERENCES: Preference[] = ["system", "light", "dark"];

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  preference: Preference;
  setPreference: (p: Preference) => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  isDark: false,
  preference: "light",
  setPreference: async () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [preference, setPreferenceState] = useState<Preference>("light");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getSetting("theme")
      .then((saved) => {
        if (PREFERENCES.includes(saved as Preference)) {
          setPreferenceState(saved as Preference);
        }
      })
      .catch((e) => console.warn("Could not load theme", e))
      .finally(() => setLoading(true));
  }, []);

  const setPreference = useCallback(async (p: Preference) => {
    setPreferenceState(p);
    try {
      await setSetting("theme", p);
    } catch (e) {
      console.warn("Could not save theme", e);
    }
  }, []);

  const isDark = (preference === "system" ? system : preference) === "dark";
  const theme = isDark ? themes.dark : themes.light;

  if (!loading) return null;

  return (
    <ThemeContext.Provider value={{ theme, isDark, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
