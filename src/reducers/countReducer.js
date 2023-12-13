
const ACTION = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
}

let initialState = {
    count : 0
}

const   actionCreator = (type)=> {

    return async(dispatch) =>{
        try{


        dispatch({type});
        }catch(err) {
            console.log(err);
        }
    }
}


export const countIncrementActionCreator = () =>{
    return actionCreator(ACTION.INCREMENT);
}
export const countDecrementActionCreator = ()=> {
    return actionCreator(ACTION.DECREMENT);
}

export const countReducer = (state = initialState, action) => {
    let {type} = action;
    switch(type) {
        case ACTION.INCREMENT: 
        state.count = state.count + 1;
        return {...state}
        case ACTION.DECREMENT:
            state.count = 0;
            return {...state}
        default: return{...state};
    }
}
