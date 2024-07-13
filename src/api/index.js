const BASE_URL = "https://chat-app-nextjs-backend-eta.vercel.app/api";

export const BASE_URL_SOCKET = "https://chat-app-nextjs-backend-eta.vercel.app";

export async function fetchFunc(path, method, body = null) {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
    };

    requestOptions.method = method;

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${path}`, requestOptions);
        const data = response.json();
        return data;
    } catch (error) {
        return error;
    }
}

const apiCall = {
    get: (path) => fetchFunc(path, "GET"),
    post:  (path, body) => fetchFunc(path, "POST", body),
    put:  (path, id, body) => fetchFunc(`${path}/${id}`, "PUT", body),
    delete:  (path, id) => fetchFunc(`${path}/${id}`, "DELETE")
}

export default apiCall;