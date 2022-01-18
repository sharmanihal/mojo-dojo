import { useParams } from 'react-router'
import { useDocument } from '../../hooks/useDocument'
import './Project.css'
import ProjectComments from './ProjectComments'
import ProjectSummary from './ProjectSummary'
export default function Project() {
    const {id}=useParams()
    const {document,error,isPending}=useDocument('projects',id)
   
    if(error){
        return <div className="error">{error}</div>
    }
   
    return (
        <div className='project-details'>
            {!isPending && <ProjectSummary project={document}></ProjectSummary>}
            <ProjectComments project={document}></ProjectComments>
            {isPending && <p className='loading'>loading...</p>}
        </div>
    )
}
