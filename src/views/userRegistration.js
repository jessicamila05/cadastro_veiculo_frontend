import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from  'react-router-dom'

import UserService from '../app/service/userService'
import {messageSuccess, messageError} from '../components/toastr'


class UserRegistration extends React.Component{

    state = {
		name: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    constructor(){
        super();
        this.service = new UserService()
    }


    
    validateRegistration = () => {
        const{name, userName, email, password, confirmPassword} = this.state
        const user = {name, userName, email, password, confirmPassword}

        try{
            this.service.validate(user);
        }catch(error){
            const msgs = error.messages;
            msgs.forEach(msg => messageError(msg));
            return false;
        }


        this.service.save(user)
        .then(response => {
            messageSuccess('Usuário cadastrado com sucesso!')
            this.props.history.push('/login')
        }).catch(error =>{
            messageError('Não foi possível cadastrar o usuário')
        })
        
    }


    cancel = () => {
        this.props.history.push('/login')
    }


    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="component">

                            <FormGroup label="Nome: *" htmlFor="name">
                                <input type="text"
                                id="inputName"
                                className="form-control"
                                name="name"
                                onChange={e => this.setState({name: e.target.value})} />
                            </FormGroup>
                                
                            <FormGroup label="Usuario: *" htmlFor="userName">
                                <input type="text" 
                                id="inputUserName"
                                className="form-control"
                                name="userName"
                                onChange={e => this.setState({userName: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="email">
                                <input type="email" 
                                id="inputEmail"
                                className="form-control"
                                name="email"
                                onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="password">
                                <input type="password" 
                                id="inputPassword"
                                className="form-control"
                                name="password"
                                onChange={e => this.setState({password: e.target.value})}/>
                            </FormGroup>

                            <FormGroup label="Confirmar Senha: *" htmlFor="confirmPassword">
                                <input type="password" 
                                id="inputconfirmPassword"
                                className="form-control"
                                name="confirmPassword"
                                onChange={e => this.setState({confirmPassword: e.target.value})}/>
                            </FormGroup>

                            <button onClick={this.register} 
                                type="button" 
                                className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancel} 
                                type="button" 
                                className="btn btn-danger">
                                  <i className="pi pi-times"></i> Cancelar
                            </button>

                        </div>
                    </div>
                </div>
            </Card>   
        )
         
    }

}

export default withRouter (UserRegistration)