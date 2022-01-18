import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Select from 'react-select'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'
import './Create.css'
const categories=[
    {value:'development',label:'Development'},
    {value:'design',label:'Design'},
    {value:'sales',label:'Sales'},
    {value:'marketing',label:'Marketing'}
]


export default function Create() {

    const [name,setName]=useState('')
    const [details,setDetails]=useState('')
    const [dueDate,setDueDate]=useState('')
    const [category,setCategory]=useState('')
    const [assignedUsers,setAssignedUsers]=useState([])
    const {documents}=useCollection('users')
    const [formError,setFormError]=useState(null)
    const [users,setUsers]=useState([])
    const {user}=useAuthContext()
    const {addDocument,response}=useFirestore('projects');
    
    const navigate=useNavigate()
    useEffect(()=>{
        if(documents){
            const options=documents.map(user=>{
                return{ value:user,label:user.displayName}
            })
            setUsers(options)
        }
    },[documents])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setFormError(null)
        if(!category){
            setFormError('Please Select a project category')
            return;
        }
        if(assignedUsers.length<1){
            setFormError('Please assign the project to atleast 1 user')
            return;
        }
        const createdBy={
            displayName:user.displayName,
            photoURL:user.photoURL,
            id:user.uid
        }
        const assignedUsersList=assignedUsers.map(user=>{
            return{
                displayName:user.value.displayName,
                photoURL:user.value.photoURL,
                id:user.value.id
            }
        })
        const project={
            name,
            details,
            category:category.value,
            dueDate:timestamp.fromDate(new Date(dueDate)),
            comments:[],
            createdBy,
            assignedUsersList

        }
        await addDocument(project)
        if(!response.error){
            navigate('/')
        }
        
    }

    return (
        <div className='create-form'>
           <h2 className='page-title'>Create a new project</h2>
           <form onSubmit={handleSubmit}>
               <label>
                   <span>Project name:</span>
                   <input type='text' required value={name}
                   onChange={(e)=>setName(e.target.value)}
                   ></input>
               </label>
               <label>
                   <span>Project details:</span>
                   <textarea type='text' required value={details}
                   onChange={(e)=>setDetails(e.target.value)}
                   ></textarea>
               </label>
               <label>
                   <span>Set due date:</span>
                   <input type='date' required value={dueDate}
                   onChange={(e)=>setDueDate(e.target.value)}
                   ></input>
               </label>
               <label>
                   <span>Project Category:</span>
                   <Select 
                   onChange={(option)=>setCategory(option)}
                    options={categories}
                   />
                </label>
                <label>
                    
                   <span>Assign to:</span>
                   <Select
                    onChange={(option)=>setAssignedUsers(option)}
                    options={users}
                    isMulti
                   />
                </label>
                {formError && <p className='error'>{formError}</p>}
                {response.error && <p className='error'>{response.error}</p>}
                {response.isPending && <button className='btn' disabled>Adding Project</button>}
               {!response.isPending && <button className='btn'>Add Project</button>}
           </form>
        </div>
    )
}
