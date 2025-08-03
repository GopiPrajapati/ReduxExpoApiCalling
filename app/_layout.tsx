import { ThemeProvider } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistore, store } from "../redux/store";
import { colors } from "../src/commonutils/theme";

export default function RootLayout() {
  // You can also create your own custom theme if you want!

  const CustomComponent = () => {
    const isDarkMode = useSelector((state) => state.global.isDarkMode);
    const theme = isDarkMode ? colors.dark : colors.light;
    return (
      <ThemeProvider value={theme}>
        <Tabs>
          <Tabs.Screen name="index" options={{ title: "Home" }} />
          <Tabs.Screen name="about" options={{ title: "About" }} />
        </Tabs>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </ThemeProvider>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistore}>
        {/* <ThemeProvider value={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style={isDarkMode ? "light" : "dark"} />
        </ThemeProvider> */}
        <CustomComponent />
      </PersistGate>
    </Provider>
  );
}
