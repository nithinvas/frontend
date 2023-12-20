// BatchList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './stylesheets/batchList.css'

const BatchList = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-psi-jet.vercel.app/auth/getAllBatches', {
          withCredentials: true,
        });

        setBatches(response.data);
      } catch (error) {
        console.error('Error fetching batches:', error);
        // Handle error or redirect to login page
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedBatch(event.target.value);
    console.log(event.target.value);
  };

  const [msg,setMsg] = useState(null);

  const location = useLocation();
  const cleanedState = location.state || {};
  const jwtToken = cleanedState.token;
  
  const response_data = cleanedState.response_data || {};
  console.log(cleanedState);

  const notEnrolledMessage =
    response_data && response_data.message && !response_data.isEnrolled ? (
      <p>{response_data.message}</p>
    ) : null;

  // const handlePay = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //     };
    
  //     const bodyParameters = {
  //       batchId: selectedBatch
  //     };

  //     const response = await axios.post(
  //       'https://backend-psi-jet.vercel.app/auth/payment',
  //       bodyParameters,
  //       config,
  //     );
  //     console.log(response);
  //     setMsg(response.data.message);

  //     setPaymentStatus('success');

  //     // Redirect to Enrolled page upon successful payment
  //     navigate('/enrolled', { state: cleanedState });
  //   } catch (error) {
  //     console.error('Payment failed:', error);
  //     setPaymentStatus('failed');

  //     // Redirect to the same page or handle as needed upon payment failure
  //     // navigate('/notenrolled', { state: cleanedState });
  //   }
  // };
  const handlePay = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
  
      const bodyParameters = {
        batchId: selectedBatch,
      };
  
      const response = await axios.post(
        'https://backend-psi-jet.vercel.app/auth/payment',
        bodyParameters,
        config,
      );
  
      console.log(response);
  
      if (response.data.success) {
        setPaymentStatus('success');
        // Redirect to Enrolled page upon successful payment
        navigate('/enrolled', { state: cleanedState });
      } else {
        // Payment failed, set the error message
        setMsg("Age Restriction!!!!! only 18-65 aged people are allowed");
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setMsg("Age Restriction!!!!! only 18-65 aged people are allowed");
      setPaymentStatus('failed');
    }
  };
  

  return (
    <div>
      <div className='text-center main-heading'>
        {notEnrolledMessage}
      </div>
      <h2 className='table-heading'>Batch IDs</h2>
      <table className='table-content tableStyle'>
        <thead>
          <tr>
            <th className='head-col'>Batch ID</th>
            <th className='head-col'>Start Time</th>
            <th className='head-col'>End Time</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.BatchID}>
              <td>{batch.BatchID}</td>
              <td>{batch.StartTime}</td>
              <td>{batch.EndTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className='form-content'> 
      <form>
        <label htmlFor="batchSelect">Select Batch and Pay:</label>
        <select id="batchSelect" value={selectedBatch} onChange={handleSelectChange}>
          <option value="">Select a Batch</option>
          {batches.map((batch) => (
            <option key={batch.BatchID} value={batch.BatchID}>
              {batch.BatchID}
            </option>
          ))}
        </select>
      </form>
      </div>
      

      {selectedBatch && (
        <div className='form-content'>
          <p className='amount-text'>AMOUNT 500</p>
          <button className='pay-button' onClick={handlePay}>Pay</button>
          <small>{msg ? msg:"payment can be done only if your age is between 18 and 65"}</small>
        </div>
      )}
    </div>
  );
};

export default BatchList;


