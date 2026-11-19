import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabsParamList, RootStackParamList } from "./constants/types";
import GameBrowseScreen from "./screens/GameBrowseScreen";
import { Ionicons } from "@expo/vector-icons";
import BacklogScreen from "./screens/BacklogScreen";
import WishlistScreen from "./screens/WishlistScreen";
import IconButton from "./components/UI/IconButton";
import GameSearchScreen from "./screens/GameSearchScreen";
import AppSettingScreen from "./screens/AppSettingScreen";
import { ThemeProvider, useTheme } from "./store/theme-context";
import { CurrencyProvider } from "./store/currency-context";
import DatabaseProvider from "./components/DatabaseProvider";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";
import { Theme } from "./constants/styles";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootBottomTabsParamList>();

const makeToastConfig = (theme: Theme): ToastConfig => ({
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.colors.primary400,
        backgroundColor: theme.colors.surface,
      }}
      text1Style={{ color: theme.colors.text, fontSize: 15 }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.colors.accent500,
        backgroundColor: theme.colors.surface,
      }}
      text1Style={{ color: theme.colors.text, fontSize: 15 }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: theme.colors.error500,
        backgroundColor: theme.colors.surface,
      }}
      text1Style={{ color: theme.colors.text, fontSize: 15 }}
    />
  ),
});

const BacklogOverview = () => {
  const { theme } = useTheme();
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary500 },
        headerTintColor: theme.colors.onPrimary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
        tabBarActiveTintColor: theme.colors.primary400,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <BottomTabs.Screen
        name="GameBrowse"
        component={GameBrowseScreen}
        options={({ navigation }) => ({
          title: "Browse Game",
          tabBarLabel: "Browse",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="globe" size={size} color={color} />;
          },
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                icon="search"
                size={24}
                color={tintColor}
                onPress={() => {
                  navigation
                    .getParent<NativeStackNavigationProp<RootStackParamList>>()
                    .navigate("SearchGame");
                }}
              />
            );
          },
        })}
      />
      <BottomTabs.Screen
        name="MyGame"
        component={BacklogScreen}
        options={{
          title: "My Backlog",
          tabBarLabel: "Backlog",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="menu" size={size} color={color} />;
          },
        }}
      />

      <BottomTabs.Screen
        name="MyWishList"
        component={WishlistScreen}
        options={{
          title: "My WishList",
          tabBarLabel: "WishList",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="heart" size={size} color={color} />;
          },
        }}
      />
      <BottomTabs.Screen
        name="AppSetting"
        component={AppSettingScreen}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="settings" color={color} size={size} />;
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

function AppContent() {
  const { isDark, theme } = useTheme();
  const toastConfig = makeToastConfig(theme);
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary500,
            },
            headerTintColor: theme.colors.onPrimary,
          }}
        >
          <Stack.Screen
            name="BacklogOverview"
            component={BacklogOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchGame"
            component={GameSearchScreen}
            options={{
              presentation: "card",
              title: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} position="bottom" bottomOffset={110} visibilityTime={1000} />
    </>
  );
}

export default function App() {
  return (
    <DatabaseProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <AppContent />
        </CurrencyProvider>
      </ThemeProvider>
    </DatabaseProvider>
  );
}
