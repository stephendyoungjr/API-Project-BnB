import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/userActions';

const LoginPage = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ credential, password }));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Username or Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
