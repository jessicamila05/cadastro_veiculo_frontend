import axios from 'axios'

import { AuthContext } from '../main/authenticationProvider';

export const httpClient = axios.create({
    baseURL: 'http://localhost:3000'

})


/*httpClient.interceptors.request.use(function (config){
    const token  = this.context.isAuthenticate
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});*/




  
class ApiService{

    constructor(apiurl){
        this.apiurl = apiurl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);

    }

    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)

    }

    
}

ApiService.contextType = AuthContext

export default ApiService;
