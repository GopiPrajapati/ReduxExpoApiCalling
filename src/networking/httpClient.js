import axios from "axios";
import Config from "react-native-config";
import { ACCESS_TOKEN } from "../commonutils/constants";
import { getData } from "../commonutils/utility";

// base url
export const Base_URL = Config.API_URL;

// set baseurl
const httpClient = axios.create({ baseURL: Base_URL });

// set jwt token
// export function setDefaultHeader(header, value) {
//   httpClient.defaults.headers['Authorization'] = 'bearer' + ' ' + value;
// }

// get api call
export async function GET(relativeUrl, data) {
  let url = Base_URL + relativeUrl;
  console.log("\n\n url:: ", url);

  try {
    const res = await httpClient({
      method: "GET",
      url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getData(ACCESS_TOKEN)}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
}

// POST api call
export async function POST(relativeUrl, data) {
  let url = Base_URL + relativeUrl;
  console.log("\n\n url:: ", url, "\n data=>", data);
  try {
    const res = await httpClient({
      method: "POST",
      url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getData(ACCESS_TOKEN)}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
}

// POST api call
export async function POST_IMAGE(relativeUrl, data) {
  let url = Base_URL + relativeUrl;
  console.log("\n\n url:: ", url, "\n data=>", data);
  try {
    const res = await httpClient({
      method: "POST",
      url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await getData(ACCESS_TOKEN)}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
}

// PUT api call
export async function PUT(relativeUrl, data) {
  let url = Base_URL + relativeUrl;
  console.log("\n\n url:: ", url, "\n data=>", data);
  try {
    const res = await httpClient({
      method: "PUT",
      url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getData(ACCESS_TOKEN)}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
}

// DELETE api call
export async function DELETE(relativeUrl, data) {
  let url = Base_URL + relativeUrl;
  console.log("\n\n url:: ", url, "\n data=>", data);
  try {
    const res = await httpClient({
      method: "DELETE",
      url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getData(ACCESS_TOKEN)}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error;
    } else {
      return error;
    }
  }
}
