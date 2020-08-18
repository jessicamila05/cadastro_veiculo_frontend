import React from 'react'

import Login from '../views/login'
import ListVehicles from '../views/vehiculos/listVehicles'
import UserRegistration from '../views/userRegistration'
import VehicleRegistration from '../views/vehiculos/vehicleRegistration'
import {AuthConsumer} from '../main/authenticationProvider'


import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'


function RouteAuthenticated({component: Component, isUserAuthenticate, ...props}){
    return(
        <Route {...props} render={ (componentProps) => {
            if(isUserAuthenticate){
                return(
                    <Component {...componentProps}/>

                )
            }else{
                return(
                    <Redirect to={ {pathname: '#/login', state : {from: componentProps.location}}} />
                )
            }
        }} />
    )
}


function Routes (props) {
    return(
        <HashRouter>     
            <Switch> 
            <Route path="/login" component={Login} />
                <Route path="/cadastrar_usuario" component={UserRegistration} />   
                <RouteAuthenticated isUserAuthenticate={props.isUserAuthenticate} path="/listar_veiculos" component={ListVehicles} />
                <RouteAuthenticated isUserAuthenticate={props.isUserAuthenticate} path="/cadastrar_veiculo/:id?" component={VehicleRegistration} />       
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (<Routes isUserAuthenticate={context.isAuthenticate} />)
        }
    </AuthConsumer>

)