

export const courseInitialState = []


export function courseReducer (state,{type,payload}) {
    switch (type){
        case 'ADD_COURSE':
            return [...state,payload]
        default : 
            return state 
    } 
} 