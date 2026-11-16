// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://localhost:5073/Card';

export async function getCards(){
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}`}
    });

    // if (!response.ok)

    const cards = await response.json();

    return cards;
}
