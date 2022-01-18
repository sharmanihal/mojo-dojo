import { useEffect, useReducer, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"
let initialState={
    document:null,
    isPending:false,
    error:null,
    sucess:null
}

const firestoreReducer=(state,action)=>{
    switch(action.type){
        case "IS_PENDING":
            return {isPending:true,document:null,sucess:false,error:null}
        case "ADDED_DOCUMENT":
            return {document:null,isPending:false,sucess:true,error:null}
        case "DELETED_DOCUMENT":
            return {document:action.payload,isPending:false,sucess:true,error:false}
        case "UPDATED_DOCUMENT":
            return {document:null,isPending:false,sucess:true,error:false}
        case "ERROR":
            return {isPending:false,document:null,sucess:false,error:action.payload}
        default:
            return {...state}
    }
}
export const useFirestore=(collection)=>{

    const [response,dispatch]=useReducer(firestoreReducer,initialState)
    const [isCancelled,setIsCancelled]=useState(false)

    //collection
    const ref=projectFirestore.collection(collection)

    const dispatchIfNotCancelled=(action)=>{
        if(!isCancelled){
           dispatch(action)
        }
    }
    //add document
    const addDocument=async (document)=>{
        dispatch({type:'IS_PENDING'})

        try{
            const createdAt=timestamp.fromDate(new Date())
            const adddedDocument = await ref.add({...document,createdAt})
            dispatchIfNotCancelled({type:'ADDED_DOCUMENT',payload:adddedDocument})
        }catch(err){
            dispatchIfNotCancelled({type:'ERROR',payload:err.message})
        }
    }

    //delete document
    const deleteDocument=async (id)=>{
        dispatch({type:'IS_PENDING'})
        try{
            await ref.doc(id).delete();
            dispatchIfNotCancelled({type:'DELETED_DOCUMENT'})
        }catch(err){
            dispatchIfNotCancelled({type:'ERROR',payload:"could not delete"})
        }
    }
   
    //update document
    const updateDocument=async (id,updates)=>{
        dispatch({type:'IS_PENDING'})
        try{
            const updatedDocument = await ref.doc(id).update(updates);
            
            dispatchIfNotCancelled({type:'UPDATED_DOCUMENT'})
            
        }catch(err){
            dispatchIfNotCancelled({type:'ERROR',payload:'could not add the comment'})
            return null;
        }
    }

    useEffect(()=>{
        return()=>{
            setIsCancelled(true)
        }
    },[])

    return{addDocument,deleteDocument,response,updateDocument}
}