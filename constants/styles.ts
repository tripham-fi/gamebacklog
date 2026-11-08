export const GlobalStyles = {
  colors: {
    // Primary scale (light -> dark), built around teal #5EC4A8
    primary50: "#E6F7F2",
    primary100: "#C8EEE3",
    primary200: "#9EDFCB",
    primary400: "#5EC4A8", // main primary
    primary500: "#3FA98C", // slightly deeper, for buttons/headers
    primary700: "#1F7A64",
    primary800: "#17574A",

    // Accent: warm amber, also used for the "Not Own" status
    accent500: "#E0A030",

    // Error scale
    error50: "#FDE3E0",
    error500: "#F2796E", // also used for price drop / remove

    // Grays (blue-tinted to match the dark surfaces)
    gray500: "#3A4060", // border
    gray700: "#1D2030", // surface

    // Extras
    background: "#14161F",
    text: "#ECEFF8",
    textMuted: "#9AA1B8",
    onPrimary: "#0E1A16",
    border: "#3A4060",
    surface: "#1D2030",
    divider: "#272B40",
    priceDrop: "#F2796E",
  },

  // Status colors for badges and the Stats chart
  status: {
    not_own: "#E0A030",
    own: "#5B8DEF",
    playing: "#5EC4A8",
    completed: "#9B7BE0",
  },
};
