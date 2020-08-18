import React from 'react'

import AuthService from '../app/service/authService'

export const AuthContext = React.createContext({})
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class AuthenticationProvider extends React.Component{

    state = {
        userAuthenticate: null,
        isAuthenticate: false 
    }

    startSession = (user) => {
        AuthService.login(user);
        this.setState({isAuthenticate: true, userAuthenticate: user})



    }

    finishSession = () => {
        AuthService.removeUserAuthenticate();
        this.setState({isAuthenticate: false, userAuthenticate: null})

    }

    render(){
        const context = {
            userAuthenticate: this.state.userAuthenticate,
            isAuthenticate: this.state.isAuthenticate,
            startSession: this.startSession,
            finishSession: this.finishSession
        }
        
        return(
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default AuthenticationProvider;