import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext=createContext();
export const authReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state,user:action.payload}
        case 'LOGOUT':
            return {...state,user:null}
        case 'AUTH_IS_READY':
            return {...state,authIsReady:true,user:action.payload}
        default:
            return {...state}
    }
}
export default function AuthContextProvider({children}) {

    const [state,dispatch]=useReducer(authReducer,{
        user:null,
        authIsReady:false
    })
    useEffect(()=>{
        const unsub=projectAuth.onAuthStateChanged((user)=>{
            dispatch({type:'AUTH_IS_READY',payload:user})
            //only fire the dispatch once when we referch the page and then usub 
            unsub();
        })
    },[])
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
