import { getProfileApi, saveProfileApi } from "../apis/apis";

const ACTION = {
    PROFILE: 'PROFILE',
    GETPROFILE: 'GETPROFILE'
}

const initialState = {
    image: ""
}

const   actionCreator = (type, fn = () => {}, payload)=> {

    return async(dispatch) =>{
        try{

        let data = await fn(payload);


        dispatch({type, data});
        }catch(err) {
            console.log(err);
        }
    }
}


export const profileActionCreator = (payload) =>{
    return actionCreator(ACTION.PROFILE, saveProfileApi, payload);
}

export const getProfileActionCreator = (payload) =>{
    return actionCreator(ACTION.GETPROFILE, getProfileApi, payload);
}



export const profileReducer = (state = initialState , action) =>{
    let {type, data} = action;
switch(type) {
    case ACTION.PROFILE: 
        if(data?.status === 200) {
            state = data.data
           return {...state};
        }
        else{
            return{
                ...state
            }
        }
    case ACTION.GETPROFILE:
        if(data?.status === 200) {
            state = data.data
            return {...state}
        }
        else{
            return {...state}
        }

        default: return{
            ...state
        }
    }
}

