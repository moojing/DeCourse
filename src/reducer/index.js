

export const courseInitialState = {
    courses : [
      
    ]
} 


export function courseReducer (state,{type,payload}) {
    switch (type){
        case 'ADD_COURSE':
            return {
                ...state,
                courses:[...state.courses,payload]
            }
        default : 
            return state 
    } 
} 