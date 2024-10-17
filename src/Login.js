import React, { useState } from 'react';
import { SERVER_URL } from './Constants';

const Login = (props) => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const onChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

const login = async () => {
  const basicu = 'Basic ' + btoa(user.username + ':' + user.password);
  try {
    const response = await fetch(`${SERVER_URL}/login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicu
      }
    });
    if (response.ok) {
      const json = await response.json();
      sessionStorage.setItem("jwt", 'Bearer ' + json.jwt);
      sessionStorage.setItem("user", JSON.stringify(user)); // Store user object
      sessionStorage.setItem("userType", json.role); // Store user type
      props.setUserType(json.role); // Set user type in parent component
      props.setAuth(true); // Set authentication state
      setMessage('');
    } else {
      const text = await response.text(); // Get the response text
      console.error("Response error:", text); // Log the response text
      setMessage("response error: " + response.status);
    }
  } catch (err) {
    console.error("Network error:", err); // Log the network error
    setMessage("network error: " + err);
  }
}

  return (
      <div className="App">
        <h4>{message}</h4>
        <table className="Center">
          <tbody>
          <tr>
            <td> <label htmlFor="username">UserName</label> </td>
            <td> <input type="text" name="username" value={user.username} onChange={onChange} />  </td>
          </tr>
          <tr>
            <td> <label htmlFor="password">Password</label></td>
            <td> <input type="password" name="password" value={user.password} onChange={onChange} /> </td>
          </tr>
          </tbody>
        </table>
        <br />
        <button id="submit" onClick={login}>Login</button>
      </div>
  );
}

export default Login;
