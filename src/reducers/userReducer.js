import {loginWithToken, logoutApi, signupApi} from '../apis/apis';
import { loginApi } from '../apis/apis';


const initialState =  {
    full_name : "",
    username: "",
    password: "",
    signupFlag : false,
    loginFlag : false,
    notLoginFlag : true,
}

const ACTION = {
    SIGNUP: 'SIGNUP',
    LOGIN:  'LOGIN',
    LOGINWITHTOKEN: 'LOGINWITHTOKEN',
    LOGOUT: 'LOGOUT'
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


export const signupActionCreator = (payload) =>{
    return actionCreator(ACTION.SIGNUP, signupApi, payload);
}
export const loginActionCreator = (payload)=> {
    return actionCreator(ACTION.LOGIN , loginApi, payload);
}

export const loginWithTokenActionCreator = () =>{
    return actionCreator(ACTION.LOGIN , loginWithToken);
}

export const logoutActionCreator = ()=>{
    return actionCreator(ACTION.LOGOUT, logoutApi)
}



export const userReducer = (state = initialState, action) =>{
    let {type, data} = action;
switch(type) {
    case ACTION.SIGNUP: 
        if(data.status === 200) {
            state = data.data;      
        }
           return {...state};

    case ACTION.LOGIN:
           if(data?.status === 200) {
                sessionStorage.setItem(
                    "access-token",
                    data.data.accessToken
                  )
            state = data.data;
           }
           else{
            state = initialState;
           }
          return{...state};

          case ACTION.LOGINWITHTOKEN:
            if(data.status === 200){}
            else{
                state = initialState;
            }
            return {...state};

            case ACTION.LOGOUT:
                if(data.status === 200){
                    state = initialState;
                }
                return{...state};
    default : return{...state};
        }
    }