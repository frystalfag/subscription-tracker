const API_URL = "http://localhost:3000/subscriptions";

async function getSubscriptions() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
