// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://localhost:5073';

async function postAuthRequest(endpoint, authDetails) {
    const response = await fetch(`${API_URL}/Auth/${endpoint}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(authDetails)
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.errors
            ? Object.values(data.errors)[0][0]
            : data.detail || data.message || JSON.stringify(data);

        throw new Error(errorMessage);
    }

    return data.token;
}

export const register = (authDetails) => postAuthRequest("Register", authDetails);
export const login = (authDetails) => postAuthRequest("Login", authDetails);

async function userSettings(method, endpoint, authDetails = {}) {
    const token = localStorage.getItem("token");

    const requestOptions = { 
        method: method,
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(authDetails)
    }

    const response = await fetch(`${API_URL}/User/${endpoint}`, requestOptions);

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.errors
            ? Object.values(data.errors)[0][0]
            : data.detail || data.message || JSON.stringify(data);

        throw new Error(errorMessage);
    }

    return true
}

export const amendUser = (authDetails) => userSettings("PUT", "UpdateUser", authDetails);
export const deleteUser = () => userSettings("DELETE", "User");