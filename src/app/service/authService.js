import LocalStorageServe from './localStorageService'

export const USER_LOGIN = '_user_login'

export default class AuthService{

    static isUserAuthenticate(){
        const user = LocalStorageServe.getItem(USER_LOGIN)
        return user && user.id;
    }
    
    static removeUserAuthenticate(){
        LocalStorageServe.removeItem(USER_LOGIN)

    }

    static login(user){
        LocalStorageServe.addItem(USER_LOGIN, user)
    }

    static getUserAuthenticate(){
        return LocalStorageServe.getItem(USER_LOGIN);
    }
}