import axios from "axios";

// Create an axios instance configured with your API's base URL and any necessary headers
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Ensure the base URL is correctly set in your environment variables
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": import.meta.env.VITE_API_KEY, // Assuming you use an API key for authentication
  },
});

// Log axios base URL and headers for debugging
console.log("Axios baseURL:", instance.defaults.baseURL);
console.log("Axios headers:", instance.defaults.headers);

// Function to fetch all houses
export const getHouses = async () => {
  try {
    const response = await instance.get("/");
    console.log("getHouses data:", JSON.stringify(response.data)); // Logging response data
    return response.data;
  } catch (error) {
    console.error("Error in getHouses:", error);
    throw error;
  }
};

// The House API is only accessible through the browser from: http://localhost:8080 .
// axios
//   .get("http://localhost:8080")
//   .then((response) => {
//     // Handle the response data here
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // Handle errors here
//     console.error("Error fetching data:", error);
//   });

// Function to post a new house
export const postHouse = async (formData) => {
  try {
    const response = await instance.post("/", formData, {
      headers: formData.has("image")
        ? {
            "Content-Type": "multipart/form-data",
          }
        : {
            "Content-Type": "application/json",
          },
    });
    return response.data;
  } catch (error) {
    console.error("Error in postHouse:", error);
    throw error;
  }
};

// Function to update a house
export const updateHouse = async (house, id) => {
  try {
    const response = await instance.patch(`/${id}`, house);
    console.log("updateHouse response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in updateHouse:", error);
    throw error;
  }
};

// Function to delete a house
export const deleteHouse = async (id) => {
  try {
    const response = await instance.delete(`/${id}`);
    console.log("deleteHouse response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in deleteHouse:", error);
    throw error;
  }
};

// Function to upload an image for a house
export const uploadImage = async (image, houseId) => {
  try {
    let formData = new FormData();
    formData.append("image", image, image.name);
    const response = await instance.post(`/${houseId}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("uploadImage response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    throw error;
  }
};
