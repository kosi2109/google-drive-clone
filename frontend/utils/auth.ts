import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next"

export const isLoggedIn = () => {  
    return hasCookie('user_data') && hasCookie('access_token');
}

export const logIn = (user : string, jwt : string) => {
    setCookie('user_data' , user, {maxAge : 10000});
    setCookie('access_token' , jwt, {maxAge : 10000});
}

export const logOut = () => {
    if (typeof window !== 'undefined') {
        deleteCookie('access_token');
        deleteCookie('user_data');   
    }
}
