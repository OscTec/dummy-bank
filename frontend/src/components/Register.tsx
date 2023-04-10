import { useFormik } from 'formik';
import { pick } from 'lodash';
import { useNavigate } from 'react-router-dom';

import * as userServices from '../services/userService';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      const { token } = await userServices.register(pick(values, ['name', 'email', 'password']));
      localStorage.setItem('token', token);
      navigate('/')
    },
  });

  return (
    <form className='form-control p-5' onSubmit={formik.handleSubmit}>
      <label className='label' htmlFor="name">
        <span className='label-text'>Name</span>
      </label>
      <input
        className='input input-bordered'
        id="name"
        name="name"
        type="text"
        placeholder='John Doe'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
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
      <label className='label' htmlFor="confirmPassword">
        <span className='label-text'>Confirm Password</span>
      </label>
      <input
        className='input input-bordered'
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      <button className='btn btn-success mt-5' type="submit">Register</button>
    </form>
  );
}

export default Register
