export function emailMatch(email) {
    const emailPattern = '^[a-zA-Z0-9.!#$%&\'*+/=?^' +
    '_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])' +
    '?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
    return email.match(emailPattern);
}

export function passwordMatch(password) {
    const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
    return password.match(passwordPattern);
}
