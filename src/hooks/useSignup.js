import { useEffect, useState } from "react"
import { projectAuth, projectFirestore, projectStorage } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup=()=>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch}=useAuthContext();
    const [isCancelled,setIsCancelled]=useState(false)
    const signup=async (email, password, displayName, thumbnail)=>{
        setError(null)
        setIsPending(true)

        try{
            //signup user
            const response = await projectAuth.createUserWithEmailAndPassword(email,password);
            if(!response){
                throw new Error("Could not sign up!")
            }
            
            //upload user photo
            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imageUrl= await img.ref.getDownloadURL()
            //add display name 
            await response.user.updateProfile({displayName, photoURL:imageUrl})
           
            //Create a user document
            await projectFirestore.collection('users').doc(response.user.uid).set({
                online:true,
                displayName,
                photoURL:imageUrl
            })
           
            //dispatch the login action
            dispatch({type:'LOGIN',payload:response.user})
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }catch(err){
            if(!isCancelled){
                console.log(err.message)
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
    return {error,isPending,signup}
}