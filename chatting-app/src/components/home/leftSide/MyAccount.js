import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AiOutlineLogout } from 'react-icons/ai';

import { API, setAuthToken } from '../../../config/api';

export default function MyAccount() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const getUser = async () => {
    try {
      setAuthToken(localStorage.token);

      const response = await API.get('/user');

      const { error, user } = response.data;

      if (error) {
        return console.log(error.message);
      }

      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-white grid grid-cols-10">
      <div className="col-span-2">
        <img
          src={userData.image ? userData.image : './profile-1.png'}
          alt="image-avatar"
          className="rounded-full border-4 bg-gray-900"
          style={{ width: '60px', height: '60px' }}
        />
      </div>
      <div className="col-span-5 flex items-center">
        <div>
          <div className="font-thin text-xs">Welcome,</div>
          <div>
            {userData.firstName} {userData.lastName}
          </div>
        </div>
      </div>
      <div className=" col-span-3 flex justify-end items-center">
        <button
          className="bg-red-4 p-2 rounded-lg hover:bg-black"
          onClick={logout}
        >
          <AiOutlineLogout size={20} />
        </button>
      </div>
    </div>
  );
}
