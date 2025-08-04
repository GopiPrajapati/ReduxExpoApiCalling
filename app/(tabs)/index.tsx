// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";
// import { useTheme } from "@react-navigation/native";
// import { Image } from "expo-image";
// import { useEffect } from "react";
// import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts, setThemeMode } from "../../redux/actions/global";

// export default function HomeScreen() {
//   const global = useSelector((state) => state?.global);
//   const { colors } = useTheme();

//   const dispatch = useDispatch();

//   console.log("global", global);

//   const changeTheme = () => {
//     const mode = !global?.isDarkMode ? "dark" : "light";
//     dispatch(setThemeMode(mode));
//   };

//   const focus = async () => {
//     dispatch(
//       getProducts({
//         SuccessCallback: (data) => {
//           console.log(
//             "Products fetched successfully:",
//             JSON.stringify(data, null, 4)
//           );
//         },
//         FailureCallback: (error) => {
//           console.error("Error fetching products:", error);
//         },
//       })
//     );
//   };

//   useEffect(() => {
//     console.log("HomeScreen useEffect called");
//     focus();
//   }, []);

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//         <TouchableOpacity onPress={changeTheme}>
//           <Text
//             style={{
//               flex: 1,
//               backgroundColor: colors.inputTheme.textInputColor,
//             }}
//           >
//             Change Theme From Here
//           </Text>
//         </TouchableOpacity>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit{" "}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//           to see changes. Press{" "}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: "cmd + d",
//               android: "cmd + m",
//               web: "F12",
//             })}
//           </ThemedText>{" "}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">
//             npm run reset-project
//           </ThemedText>{" "}
//           to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//           directory. This will move the current{" "}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });

import "react-native-reanimated";

import { addTodo } from "@/redux/actions/global";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// const apiConfig = {
//   productionBaseURL: "https://fakestoreapi.com",
//   developmentBaseURL: "https://fakestoreapi.com",
//   testingBaseURL: "https://fakestoreapi.com", // optional
// };

const dummyData = [
  { userId: "001", userName: "Gopi", userSurname: "Prajapati" },
  { userId: "002", userName: "Alok", userSurname: "Chaurasiya" },
  { userId: "003", userName: "Sanjana", userSurname: "Murari" },
  { userId: "004", userName: "Nilesh", userSurname: "Patel" },
  { userId: "005", userName: "Hiren", userSurname: "Valera" },
  { userId: "006", userName: "Brijesh", userSurname: "Mehta" },
];

// Type definitions

type User = {
  userId: string;
  userName: string;
  userSurname: string;
};

const UserItem = memo(({ item }: { item: User }) => (
  <View style={styles.card}>
    <Text style={styles.name}>
      {item.userName} {item.userSurname}
    </Text>
    <Text style={styles.userId}>User ID: {item.userId}</Text>
  </View>
));
UserItem.displayName = "UserItem";

// 🔹 Separated SearchBar Component

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};
const SearchBar = ({ value, onChangeText, ref }: SearchBarProps) => (
  <TextInput
    ref={ref}
    placeholder="Search by ID, Name or Surname"
    value={value}
    onChangeText={onChangeText}
    style={styles.searchInput}
  />
);

export default function HomeScreen() {
  // Type the Redux state

  const ref = useRef(null);
  const TodoList = useSelector(
    (state: { global: { todoList?: User[] } }) => state.global?.todoList ?? []
  );

  // const state = useSelector((state) => state); // Removed: never select the entire state

  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  // Clear AsyncStorage on first mount (for development only)
  // useEffect(() => {
  //   // Uncomment the next lines for a one-time clear, then comment/remove for production
  //   // AsyncStorage.clear().then(() => {
  //   //   console.log("AsyncStorage cleared. Restart the app to see initial state.");
  //   // });
  //   // Log the initial Redux state for debugging
  //   setTimeout(() => {
  //     AsyncStorage.getAllKeys().then((keys) => {
  //       console.log("AsyncStorage keys after mount:", keys);
  //     });
  //   }, 1000);
  // }, []);

  useEffect(() => {
    console.log("TodoList after mount:", TodoList);
  }, [TodoList]);

  // 🔹 Memoized List Item Component

  // 🔹 useMemo for Filtering (prevents unnecessary recalculations)
  // const filteredData = useMemo(() => {
  //   const search = searchText.toLowerCase();
  //   return TodoList.filter(
  //     (item: User) =>
  //       item.userName.toLowerCase().includes(search) ||
  //       item.userId.toLowerCase().includes(search) ||
  //       item.userSurname.toLowerCase().includes(search)
  //   );
  // }, [searchText, TodoList]);

  const filteredData = useMemo(() => {
    const search = searchText.toLocaleLowerCase();
    return TodoList.filter(
      (item: User) =>
        item.userName.toLocaleLowerCase().includes(search) ||
        item.userId.toLowerCase().includes(search) ||
        item.userSurname.toLocaleLowerCase().includes(search)
    );
  }, [searchText, TodoList]);

  const addTodo2 = () => {
    const newTodo = {
      userId: "001",
      userName: searchText,
      userSurname: "Prajapati",
    };
    dispatch(addTodo(newTodo));
    ref?.current?.blur();
    setSearchText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Static Components not affected by search */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>👤 User List</Text>
      </View>

      {/* Search Bar */}
      <SearchBar value={searchText} onChangeText={setSearchText} ref={ref} />

      <Button title="Add Todo" onPress={addTodo2} />

      {/* FlatList only re-renders filtered data */}
      <FlatList
        data={filteredData}
        renderItem={({ item }: { item: User }) => <UserItem item={item} />}
        keyExtractor={(item) => item.userId}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users found</Text>
        }
        style={{ flex: 1, backgroundColor: "red", marginBottom: 80 }} // Ensures FlatList takes available space
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  searchInput: {
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: "black",
  },

  card: {
    backgroundColor: "#f1f1f1",
    padding: 16,
    marginVertical: 6,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  userId: {
    color: "#666",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
