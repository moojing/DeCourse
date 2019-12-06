import {createStore} from 'redux'



export const store = createStore(
    reducer, 
    initialState, 
    window.devToolsExtension && window.devToolsExtension() 
)

