// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://localhost:5073/Card';

export async function fetchCardData(method, cardId = null, cardContent = null){
    const token = localStorage.getItem("token");

    const route = cardId ? `${API_URL}/${cardId}` : API_URL;

    const requestOptions = {
        method: method,
        headers: {"Authorization": `Bearer ${token}`}
    }
    
    if (cardContent !== null && cardContent !== undefined){
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(cardContent);
    }

    const response = await fetch(route, requestOptions);

    if (response.status === 204){
        return
    }

    const data = await response.json();

    if (!response.ok){
        const errorMessage = data.errors;
        throw new Error(errorMessage);
    }

    return data;
}