
export default class LocalStorageService{

    static addItem(key , value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key){
        const item = localStorage.getItem(key);
        return JSON.parse(item)
    }

    static removeIten(key){
        localStorage.removeItem(key)
    }
}