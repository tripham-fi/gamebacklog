import { createContext, ReactNode, useContext, useState } from "react";
import { Theme, themes } from "../constants/styles";
import { useColorScheme } from "react-native";

type Preference = "system" | "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  preference: Preference;
  setPreference: (p: Preference) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  isDark: false,
  preference: "light",
  setPreference: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [preference, setPreference] = useState<Preference>("light");
  const isDark = (preference === "system" ? system : preference) === "dark";
  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
