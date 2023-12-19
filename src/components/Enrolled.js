import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './stylesheets/Enrolled.css';

const Enrolled = () => {
  const location = useLocation();
  const cleanedState = location.state || {};
  const jwtToken = cleanedState.token;
  const [userData, setUserData] = useState(null);
  const [startTime,setStart] = useState(null);
  const [endTime,setEnd] = useState(null);
  const [batchId , setBatchId] = useState(null);

  useEffect(() => {
    const getuser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };

        const response = await axios.get(
          'https://backend-psi-jet.vercel.app/auth/getuserdata',
          config
        );

        setUserData(response?.data?.user?.name);
        setStart(response?.data?.user?.startTime);
        setEnd(response?.data?.user?.endTime);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getuser();
  }, [jwtToken]);

  return (
    <div className="text-center">
      <h1>Welcome {userData}</h1>

      <div>
        Your slot is {startTime} to {endTime}
      </div>
    </div>
  );
};

export default Enrolled;
