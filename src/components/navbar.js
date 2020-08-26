import React from 'react'

import NavbarItem from './navbarItem'
import { AuthConsumer } from '../main/authenticationProvider';



function Navbar(props){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/listar_veiculos" className="navbar-brand">Sistema de Cadastro de Veículos</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUserAutenticate} href="/listar_veiculos" label="Veículos" />
                        <NavbarItem render={props.isUserAutenticate} href="/cadastrar_veiculo" label="Cadastrar Veículo" />
                        <NavbarItem render={props.isUserAutenticate} href="/cadastrar_usuario" label="Cadastrar Usuario" />
                        <NavbarItem render={props.isUserAutenticate} onClick={props.logOut} href="/" label="Sair" />
             
                    </ul>
  
                </div>
            </div>
        </div>
    )
}


export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUserAutenticate={context.isAutenticate} logOut={context.finishSession} />
        )}
    </AuthConsumer>
)
