import React from 'react';
import { useLocation } from 'react-router-dom';

const NotEnrolled = () => {
  const location = useLocation();
  const cleanedState = location.state;

  // Access the token from cleanedState
  const token = cleanedState.token;
  const response_data=cleanedState.response_data;

  // Check if user is not enrolled
  console.log("notenrolled console:",cleanedState);
  console.log("token is :",token);

  // Check if response_data and its properties exist before accessing them
  const notEnrolledMessage =
    response_data && response_data.message && !response_data.isEnrolled ? (
      <p>{response_data.message}</p>
    ) : null;

  return (
    <div>
      {/* Display not enrolled message */}
      {notEnrolledMessage}
    </div>
  );
};

export default NotEnrolled;
