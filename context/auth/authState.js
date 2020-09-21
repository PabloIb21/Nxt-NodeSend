import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR, 
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {

    // definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    // definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    // registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data.msg);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });
        }
        // limpia la alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // Autenticar usuarios
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
        // limpia la alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }

    // retorne el usuario autenticado en base al jwt
    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            if(respuesta.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });
        }
    }

    // cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >   
            {children}
        </authContext.Provider>
    )
}

export default AuthState;