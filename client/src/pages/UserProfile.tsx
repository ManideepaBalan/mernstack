import React , {useState}  from "react";
import Projects from '../components/Projects/Projects';
import { useParams }  from "react-router-dom"

const UserProfile = () => {
    const { id } = useParams<{id : string}>();
    //const [data , setData] = useState(id);
    return (
        <div className='userProfile'>
            <Projects userId={id} />
        </div>
    );
}

export default UserProfile;
