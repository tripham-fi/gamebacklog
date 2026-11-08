import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabsParamList, RootStackParamList } from "./constants/types";
import GameBrowseScreen from "./screens/GameBrowseScreen";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import BacklogScreen from "./screens/BacklogScreen";
import WishlistScreen from "./screens/WishlistScreen";
import IconButton from "./components/UI/IconButton";
import GameSearchScreen from "./screens/GameSearchScreen";
import AppSettingScreen from "./screens/AppSettingScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootBottomTabsParamList>();

const BacklogOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.text,
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

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: "white",
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
    </>
  );
}
