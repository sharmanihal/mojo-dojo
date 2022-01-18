import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin=()=>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch}=useAuthContext()
    const [isCancelled,setIsCancelled]=useState(false)
   
    const login=async (email,password)=>{
        setError(null)
        setIsPending(true)
        try{
            const response = await projectAuth.signInWithEmailAndPassword(email,password)

            dispatch({type:'LOGIN',payload:response.user})
            const uid=response.user.uid;
            //update online status
            await projectFirestore.collection('users').doc(uid).update({
                online:true
            })
            if(!isCancelled){
                setError(null)
                setIsPending(false)
            }
        }catch(err){
            console.log(err)
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(()=>{
        return()=>{
            setIsCancelled(true)
        }
    },[])

    return {error,isPending,login}
}