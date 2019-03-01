export const Apis = {
    news: '23b7b63c2e864d36beaf72e531b1d4a1',
};
export const Urls = {
    register: 'https://reqres.in/api/register',
    login: 'https://reqres.in/api/login',
    newsFetch: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${Apis.news}`
}
export const googleConfig = {
    scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
    webClientId: '226583581847-jtv6lvlrnnr8hfaskm63nuv2ngfvt6oc.apps.googleusercontent.com',
    offlineAccess: true
};
