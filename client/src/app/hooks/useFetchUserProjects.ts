
import { useEffect, useState } from 'react';
import axios from 'axios';
import { chatType } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUserChats } from '@/features/chatsSlice';
import { useParams } from 'react-router-dom';
import { setUserProjects } from '@/features/projectsSlice';

const useFetchUserProjects = () => {
  const allProjects = useSelector((state: RootState) => state.projects.allProjects)
  const [projectsLoading, setProjectsLoading] = useState(true);
  // const userId = useSelector((state: RootState) => state.user.value?._id)
  const { userId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(userId)
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://localhost:8000/api/v1/projects', {
          params: { userId: userId }
        });
        

        dispatch(setUserProjects(response))
      } catch (error) {
        console.error(error)
      }
      setTimeout(() => {
        setProjectsLoading(false);
      }, 2000);
    };

    if (userId) fetchData();
  }, [userId]);

  return {
    allProjects,
    projectsLoading,
  };
};

export default useFetchUserProjects;


