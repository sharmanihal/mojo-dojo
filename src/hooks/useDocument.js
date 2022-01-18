import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config";

export const useDocument=(collection,id)=>{

    const [error,setError]=useState(null);
    const [isPending,setIsPending]=useState(false);
    const [document,setDocument]=useState(null)

    useEffect(()=>{
        setIsPending(true)
        let ref=projectFirestore.collection(collection).doc(id)

        const unsub = ref.onSnapshot(snap=>{
            if(snap.data()){
                setError(null)
                setDocument({...snap.data(),id:snap.id})
                setIsPending(false)
            }else{
                setIsPending(false);
                setError('could not fetch the project !')
            }
        },err=>{
            setError(err.message)
            console.log(err.message)
            setIsPending(false)
        })
        return()=>{
            unsub();
        }
    },[collection,id])

    return {document,error,isPending}
}