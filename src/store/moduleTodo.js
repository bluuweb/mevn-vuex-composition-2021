import router from '../router'

const URL = 'https://todo-api-rest-1.herokuapp.com/api/todo/'
const moduleTodo = {
    namespaced: true,
    state: () => ({
        todos: [],
        errors: null,
        todo: null
    }),
    mutations: {
        setTodos(state, todos){
            state.todos = todos
        },
        setErrors(state, errors){
            state.errors = errors
        },
        addTodo(state, todo){
            state.todos.push(todo)
        },
        removeTodo(state, id){
            state.todos = state.todos.filter(item => item._id !== id)
        },
        getTodo(state, todo){
            state.todo = todo
        },
        editTodo(state, todo){
            state.todos = state.todos.map(item => {
                if(item._id === todo.id){
                    return todo
                }
                return item
            })
        }
    },
    actions: {
        async editTodo({commit}, todo){
            try {
                const res = await fetch(URL + todo._id, {
                    method: 'PUT',
                    headers: {
                        'x-mi-token': localStorage.getItem('token'),
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(todo)
                })
                const api = await res.json()
                
                if(api.errors){
                    return commit('setErrors', api.errors)
                }

                commit('editTodo', api.todoUpdate)
                commit('setErrors', null)

                router.push('/')
                commit('getTodo', null)
            } catch (error) {
                console.log(error)
            }
        },
        async getTodo({commit}, id){
            commit('getTodo', null)
            try {
                const res = await fetch(URL + 'id/' + id, {
                    method: 'GET',
                    headers: {
                        'x-mi-token': localStorage.getItem('token'),
                        'Content-type': 'application/json'
                    }
                })

                const api = await res.json()
                console.log(api)
                
                if(api.errors){
                    return commit('setErrors', api.errors)
                }

                commit('getTodo', api.todo)
                commit('setErrors', null)

                
            } catch (error) {
                console.log(error)
            }
        },
        async removeTodo({commit}, id){
            try {
                const res = await fetch(URL + id, {
                    method: 'DELETE',
                    headers: {
                        'x-mi-token': localStorage.getItem('token'),
                        'Content-type': 'application/json'
                    }
                })
                const api = await res.json()

                if(api.errors){
                    return commit('setErrors', api.errors)
                }

                commit('removeTodo', id)
                commit('setErrors', null)

            } catch (error) {
                console.log(error)
            }
        },
        async addTodo({commit}, texto){
            try {
                const res = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'x-mi-token': localStorage.getItem('token'),
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({texto})
                })
                const api = await res.json()

                if(api.errors){
                    return commit('setErrors', api.errors)
                }

                commit('addTodo', api.todo)
                commit('setErrors', null)

            } catch (error) {
                console.log(error)
            }
        },
        async getTodos({commit}){
            try {
                const res = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        'x-mi-token': localStorage.getItem('token'),
                        'Content-type': 'application/json'
                    }
                })
                const api = await res.json()
                if(api.errors){
                    return commit('setErrors', api.errors)
                }
                commit('setTodos', api.todos)
                commit('setErrors', null)
            } catch (error) {
                console.log(error)
            }
        }
    },
    getter: {

    }
}

export {moduleTodo}