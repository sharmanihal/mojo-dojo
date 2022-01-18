import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout=()=>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch,user}=useAuthContext()
    const [isCancelled,setIsCancelled]=useState(false)
    const logout=async ()=>{
        setError(null)
        setIsPending(true)
        //sign user out 
        try{
            //update online status
            const {uid}=user
            await projectFirestore.collection('users').doc(uid).update({
                online:false
            })
            await projectAuth.signOut();
            //dispatch logout action
            dispatch({type:'LOGOUT'})

            //check if the component is cancelled
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }catch(err){
            console.log(err)
            if(!isCancelled){
                setError(err.message)
                setIsPending(false)
            }
        }
        
    }
    useEffect(() => {
        return () => {
           setIsCancelled(true)
        }
    }, [])
    return {error,isPending,logout}
}