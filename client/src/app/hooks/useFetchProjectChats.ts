
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { setUserProjectChats, setUserProjects } from '@/features/projectsSlice';

const useFetchProjectChats = () => {
    const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const [loading, setLoading] = useState(true);
    const { userId, projectId } = useParams()
    const dispatch = useDispatch()
    const [ projectChats, setProjectChats ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:8000/api/v1/chats', {
                    params: { userId: userId, projectId: projectId }
                });

                console.log(response.data)
                dispatch(setUserProjectChats(response.data))
                setProjectChats(projectChats)
            } catch (error) {
                console.error(error)
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };

        if (userId) fetchData();
    }, [userId, projectId]);

    let projectIdx = allProjects.findIndex((project) => project._id == projectId)
    return {
        allProjectChats: allProjects[projectIdx].chats,
        loading,
    };
};


export default useFetchProjectChats