export const get = async (url) => {
    let response;
    try {
        response = await fetch(url);
        return response.json();
    } catch (err) {
        throw response;
    }
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
    let response;
    try {
        response = await fetch(url, extras);
        return response.json();
    } catch (err) {
        throw err;
    }
};

