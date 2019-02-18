export const get = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export const post = async (url, data) => {
    const extras = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    };
    const response = await fetch(url, extras);
    return response.json();
};

