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

    return true;
}

export const register = (authDetails) => postAuthRequest("Register", authDetails);
export const login = (authDetails) => postAuthRequest("Login", authDetails);


export async function amendUser(authDetails) {
    const requestOptions = {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(authDetails)
    }

    const response = await fetch(`${API_URL}/User/UpdateUser`, requestOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to amend user details");
    }

    return true;
}

export async function deleteUser(userId) {
    const requestOptions = { method: "DELETE" }

    const response = await fetch(`${API_URL}/User/User/${userId}`, requestOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to delete user");
    }

    return true
}