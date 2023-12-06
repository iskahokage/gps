import axios from "axios";

export const baseUrl = 'http://159.89.169.153:8000';

export const postData = async(path, payload) => {
    try {
        const {data} = await axios.post(baseUrl + path, payload);
        return data
    } catch (error) {
        console.error(error)
    }
}

const api = axios.create()


// api.interceptors.request.use((config) => {
//     const authToken = getToken(); // Replace with your function to get the authentication token
//     if (authToken) {
//         config.headers["Authorization"] = `${authToken}`;
//     }
//     return config;
// });

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         // if (error.response && error.response.status === 500){

//         // }
//         if (error.response && error.response.status === 401) {
//                 try {
//                     const newAuthToken = await refreshAuthToken(); // Replace with your function to refresh the token
//                     setToken(newAuthToken); // Replace with your function to store the new token
//                     // Retry the original request with the new token
//                     const originalRequest = error.config;
//                     originalRequest.headers[
//                         "Authorization"
//                     ] = `Bearer ${newAuthToken}`;
//                     return api(originalRequest);
//                 } catch (refreshError) {
//                     // Handle refresh token failure (e.g., redirect to login page)
//                     store.dispatch(logout())
//                     return Promise.reject(refreshError);
//                 }
//         }
//         return Promise.reject(error);
//     }
// );

// export default api