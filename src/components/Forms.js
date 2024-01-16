// Forms.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './stylesheets/Forms.css'

const Login = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://stageio.symplify.app/api/accounts/login/',
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);

      const jwtToken = response.data.token;

      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        withCredentials: true,
      };

      try {
        const response_data = await axios.get('https://backend-psi-jet.vercel.app/auth/checkEnrollment', config);
        console.log(response_data);

        // Clean up the state before navigation
        const cleanedState = {
          response_data: response_data.data,
          token: jwtToken,
        };

        if (response_data.data.isEnrolled) {
          navigate('/enrolled', { state: cleanedState });
        } else {
          navigate('/batch_id', { state: cleanedState });
        }
      } catch (error) {
        console.error('Error in request:', error);
      }
    } catch (error) {
      console.error('Login failed', error);
      alert(error);
    }
  };

  

  return (
    <div className='main-form'>
      <h2 className='text-center'>Login</h2>
      <div>
        <label className='form-label'>
          Email:
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
      
      <br />
      <label className='form-label'>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <div className='form-label'>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className='form-label'>
      <p>
        Don't have an account?{' '}
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={onToggle}>
          Sign Up
        </span>
      </p>
      </div>
      </div>
    </div>
  );
};


// const Signup = ({ onToggle }) => {
//   const [name, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [dateOfBirth, setDOB] = useState('');
//   const navigate = useNavigate(); // Use the useNavigate hook

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post('https://backend-psi-jet.vercel.app/auth/register', { name, email, dateOfBirth, password });
//       console.log('Signup successful', response.data);
//       alert(response.data.message);
//       // Redirect to login page after successful signup
//       navigate('/');
//     } catch (error) {
//       console.error('Signup failed', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <label>
//         Username:
//         <input type="text" name="name" onChange={(e) => setUsername(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
//       </label>
//       <label>
//         Date of birth:
//         <input type="date" name="dateOfBirth" onChange={(e) => setDOB(e.target.value)} />
//       </label>
//       <br />
//       <button onClick={handleSignup}>Sign Up</button>
//       <p>
//         Already have an account?{' '}
//         <span style={{ cursor: 'pointer', color: 'blue' }} onClick={onToggle}>
//           Login
//         </span>
//       </p>
//     </div>
//   );
// };


// ... (imports and other code)

const Signup = ({ onToggle }) => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDOB] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://backend-psi-jet.vercel.app/auth/register', { name, email, dateOfBirth, password });
      console.log('Signup successful', response.data);
      alert(response.data.message);
      // Redirect to login page after successful signup
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className='main-form'> {/* Apply the main-form class to the Signup div */}
      <h2 className='text-center'>Sign Up</h2> {/* Apply the text-center class to the h2 */}
      <div>
        <label className='form-label'>
          Username:
          <input type="text" name="name" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label className='form-label'>
          Password:
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label className='form-label'>
          Email:
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className='form-label'>
          Date of birth:
          <input type="date" name="dateOfBirth" onChange={(e) => setDOB(e.target.value)} />
        </label>
        <br />
        <button onClick={handleSignup}>Sign Up</button>
        <p>
          Already have an account?{' '}
          <span style={{ cursor: 'pointer', color: 'blue' }} onClick={onToggle}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

// ... (rest of the code)

const Forms = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login onToggle={toggleForm} /> : <Signup onToggle={toggleForm} />}
    </div>
  );
};

export default Forms;
