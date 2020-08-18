import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from  'react-router-dom'


import UserService from '../app/service/userService'
import {messageError} from '../components/toastr'
import { AuthContext } from '../main/authenticationProvider'

class Login extends React.Component{

    state = {
        userName: '',
        password: '',
       
    }

    constructor(){
        super();
        this.service = new UserService();
    }

   
    login = () => {
        this.service.authenticate({
            userName: this.state.userName,
            password: this.state.password,
           

        }).then(response =>{
            this.context.startSession(response.data)
            this.props.history.push('#/listar_veiculos')
        }).catch(error => {
            messageError(error.response.data)
        })
       
    }


    registerUser = () => {
        this.props.history.push('cadastrar_usuario')
    }
    render(){
        return(
            
            <div className="row">
                <div className="col-md-6" style={{position : 'relative', left:'300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Usuario: *" htmlFor="loginUserName">
                                                   
                                                <input type="text" 
                                                value={this.state.userName}
                                                onChange={e => this.setState({userName: e.target.value})}
                                                className="form-control" 
                                                placeholder="Usuário" 
                                                id="inputloginUserName"/>
                                            </FormGroup>

                                            <FormGroup label="Senha: *" htmlFor="loginPassword">
                                                <input type="password" 
                                                value={this.state.senha}
                                                onChange={e => this.setState({password: e.target.value})}
                                                className="form-control" 
                                                id="loginPassword" 
                                                placeholder="Senha"/>
                                            </FormGroup>

                                            <button onClick={this.login} 
                                                className ="btn btn-success">
                                                <i className="pi pi-sign-in"></i> Entrar
                                            </button>
                                            <button onClick={this.registerUser} 
                                                className ="btn btn-danger">
                                                    <i className="pi pi-plus"></i> Cadastrar
                                            </button>

                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext

export default withRouter (Login)