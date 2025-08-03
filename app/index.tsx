// import {
//   DarkTheme,
//   DefaultTheme,
//   NavigationContainer,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { useColorScheme } from "react-native";
// import { useSelector } from "react-redux";
// import { colors } from "../src/commonutils/theme";

// const CustomComponent = () => {
//   const global = useSelector((state) => state?.global);
//   const colorScheme = useColorScheme();
//   return (
//     <NavigationContainer
//       key={"navigation-container"}
//       theme={global.isDarkMode ? colors.dark : colors.light}
//     >
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack>
//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </NavigationContainer>
//   );
// };

// export default React.memo(CustomComponent);

import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../src/commonutils/theme";

const CustomComponent = () => {
  // Replace with your slice/key as appropriate:
  const isDarkMode = useSelector((state) => state.global.isDarkMode);

  // You can also create your own custom theme if you want!
  const theme = isDarkMode ? colors.dark : colors.light;

  return (
    // DO NOT add another NavigationContainer!
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </ThemeProvider>
  );
};

export default React.memo(CustomComponent);
