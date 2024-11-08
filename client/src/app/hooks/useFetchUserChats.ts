
import { useEffect, useState } from 'react';
import axios from 'axios';
import { chatType } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUserChats } from '@/features/chatsSlice';
import { useParams } from 'react-router-dom';

const useFetchUserChats = () => {
  const allChats = useSelector((state: RootState) => state.chats.allChats)
  const [loading, setLoading] = useState(true);
  // const userId = useSelector((state: RootState) => state.user.value?._id)
  const { userId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(userId)
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://localhost:8000/api/v1/chats', {
          params: { userId: userId }
        });

        dispatch(setUserChats(response))
      } catch (error) {
        console.error(error)
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    if (userId) fetchData();
  }, [userId]);

  return {
    allChats,
    loading,
  };
};

export default useFetchUserChats;
