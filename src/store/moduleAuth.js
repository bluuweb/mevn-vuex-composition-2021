const URL = 'https://todo-api-rest-1.herokuapp.com/api/auth/'
import router from '../router'
import jwt_decode from 'jwt-decode'

const moduleAuth = {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
        errors: null
    }),
    mutations: {
        setToken(state, token){
            if(token){
                state.user = jwt_decode(token)
            } else {
                state.user = null
            }
            state.token = token
        },
        setErrors(state, errors){
            state.errors = errors
        }
    },
    actions: {
        async verificarToken({commit, dispatch}){
            try {
                const res = await fetch(URL + 'validar', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-mi-token': localStorage.getItem('token')
                    }
                })
                const token = await res.json()
                if(token.errors){
                    console.log(token.errors)
                    //cerrar sesion
                    dispatch('cerrarSesion')
                    return false
                }else {
                    commit("setToken", localStorage.getItem('token'))
                    return true
                }
            } catch (error) {
                console.log(error)
                return false
            }
        },
        cerrarSesion({commit}){
            commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
        },
        async acceder({commit}, data){
            try {
                const res = await fetch(URL + data.path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.form)
                })
                const user = await res.json()

                if(user.errors){
                    return commit('setErrors', user.errors)
                }

                commit('setErrors', null)
                // commit('setToken', user.token)
                localStorage.setItem('token', user.token)
                router.push('/')

            } catch (error) {
                console.log(error)
            }
        }

    },
    getter: {

    }
}

export {moduleAuth}