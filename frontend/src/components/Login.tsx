import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as userServices from '../services/userService';

const Login = () => {
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      try {
        const { token } = await userServices.login(email, password);
        localStorage.setItem('token', token);
        navigate('/')
      } catch (error) {
        // TODO: Handle error properly, the backend needs fixing
        if (error) {
          setErrors({ message: 'Invalid email or password' })
        }
      }
    },
  });

  return (
    <form className='form-control p-5' onSubmit={formik.handleSubmit}>
      {errors.message && (
        <div className='alert alert-error'>
          {errors.message}
        </div>
      )}
      <label className='label' htmlFor="email">
        <span className='label-text'>Email</span>
      </label>
      <input
        className='input input-bordered'
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label className='label' htmlFor="password">
        <span className='label-text'>Password</span>
      </label>
      <input
        className='input input-bordered'
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button className='btn btn-success mt-5' type="submit">Log In</button>
    </form>
  );
}

export default Login
