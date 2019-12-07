

export const courseInitialState = []


export function courseReducer (state,{type,payload}) {
    console.log('payload: ', payload);
    console.log('state: ', state);
    // if(payload &&payload.length>0 &&payload[0].id==state[state.length-1].id)return
    // console.log('payload: ', payload);
    switch (type){
        case 'ADD_COURSE':
            return [...state,...payload]
        case 'LOAD_COURSE': 
            return [...payload]
        case 'RESET_COURSE':
            return []
        default : 
            return state 
    } 
} 