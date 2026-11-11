const light = {
  colors: {
    primary50: "#12332B",
    primary100: "#2A5C4F",
    primary200: "#3E7A69",
    primary400: "#1F8A70",
    primary500: "#17735D",
    primary700: "#DCEFE9",
    primary800: "#EAF6F2",
    accent500: "#B87A0F",
    error50: "#FDE3E0",
    error500: "#D4574B",
    gray500: "#D5D9E6",
    gray700: "#FFFFFF",
    background: "#F5F6FA",
    text: "#161824",
    textMuted: "#5A6178",
    onPrimary: "#FFFFFF",
    border: "#D5D9E6",
    surface: "#FFFFFF",
    divider: "#E6E8F0",
    priceDrop: "#D4574B",
  },
  status: {
    not_own: "#B87A0F",
    own: "#2F63C9",
    playing: "#1F8A70",
    completed: "#6E4DC0",
  },
};

export type Theme = typeof light;

const dark: Theme = {
  colors: {
    primary50: "#E6F7F2",
    primary100: "#C8EEE3",
    primary200: "#9EDFCB",
    primary400: "#5EC4A8",
    primary500: "#3FA98C",
    primary700: "#1F7A64",
    primary800: "#17574A",
    accent500: "#E0A030",
    error50: "#FDE3E0",
    error500: "#F2796E",
    gray500: "#3A4060",
    gray700: "#1D2030",
    background: "#14161F",
    text: "#ECEFF8",
    textMuted: "#9AA1B8",
    onPrimary: "#0E1A16",
    border: "#3A4060",
    surface: "#1D2030",
    divider: "#272B40",
    priceDrop: "#F2796E",
  },
  status: {
    not_own: "#E0A030",
    own: "#5B8DEF",
    playing: "#5EC4A8",
    completed: "#9B7BE0",
  },
};

export const themes = { dark, light };
