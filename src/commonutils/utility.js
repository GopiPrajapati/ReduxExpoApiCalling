import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    if (!value) return;
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log("\n\n error in storing data to AsyncStorage", error);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("\n\n error in getting data from AsyncStorage", error);
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("\n\n error in getting data from AsyncStorage", error);
  }
};

export const clearAllData = async (key) => {
  try {
    // await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
    AsyncStorage.getAllKeys().then((keys) => {
      keys.forEach((key) => {
        if (key != "fcm_token") AsyncStorage.removeItem(key);
      });
    });
  } catch (error) {
    console.log("\n\n error in getting data from AsyncStorage", error);
  }
};

// export const showError = (msg) =>
//   Toast.show({ type: "error", text1: "Failed", text2: msg });

// export const showSuccess = (msg) =>
//   Toast.show({ type: "success", text1: "Success", text2: msg });

// export const showMsg = (msg) =>
//   Toast.show({ type: "info", text1: "Info", text2: msg });
