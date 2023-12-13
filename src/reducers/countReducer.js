
const ACTION = {
    INCREMENT: 'INCREMENT'
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


export const countActionCreator = () =>{
    return actionCreator(ACTION.INCREMENT);
}


export const countReducer = (state = initialState, action) => {
    let {type} = action;
    switch(type) {
        case ACTION.INCREMENT: 
        state.count = state.count + 1;
        return {...state}
        default: return{...state};
    }
}
