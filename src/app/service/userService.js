import ApiService from '../apiservice'
import ValidationError from '../exception/validationError'

class UserService extends ApiService{

    constructor(){
        super('/auth')
 
    }


    authenticate(credentials){
        return this.post('/authenticate', credentials)
    }

    save(user){
        return this.post('/register', user)
    }

    validate(user){
        const error = []

        if(!user.name){
            error.push('O campo Nome é obrigatório.')
        }

        if(!user.email){
            error.push('O campo Email é obrigatório.')
        }else if(!user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            error.push('Enforme um Email valido.')
        }

        if(!user.password || !this.state.confirmPassword){
            error.push('Confirme a senha.')

        }else if(user.password !== this.state.confirmPassword){
            error.push('Senhas diferentes.')

        }
        if(error && error.length >0){
            throw new ValidationError(error);
        }
           
        return  error;
    }
}

export default UserService;