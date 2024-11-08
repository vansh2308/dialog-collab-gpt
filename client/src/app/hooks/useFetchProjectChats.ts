
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useParams } from 'react-router-dom';
import { setUserProjectChats } from '@/features/projectsSlice';
import { setProjectChats } from '@/features/projectChatsSlice';

const useFetchProjectChats = () => {
    // const allProjects = useSelector((state: RootState) => state.projects.allProjects)
    const allProjectChats = useSelector((state: RootState) => state.projectChats.allProjectChats)
    const [loading, setLoading] = useState(true);
    const { userId, projectId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:8000/api/v1/chats', {
                    params: { userId: userId, projectId: projectId }
                });

                dispatch(setProjectChats(response.data))
            } catch (error) {
                console.error(error)
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };

        if (userId) fetchData();
    }, [userId, projectId]);

    // let projectIdx = allProjects.findIndex((project) => project._id == projectId)
    return {
        allProjectChats,
        loading,
    };
};


export default useFetchProjectChats