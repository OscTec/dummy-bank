import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { pick } from 'lodash';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import * as userServices from '../services/userService';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

type FormData = z.infer<typeof schema>

const Register = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors, isValid } } = useForm<FormData>({ mode: 'all', resolver: zodResolver(schema) });

  const onSubmit = async (values: FieldValues) => {
    const response = await userServices.register(pick(values, ['name', 'email', 'password']));
    if (response.status !== 200) {
      return;
    }

    localStorage.setItem('token', response.headers.get("x-auth-token"));

    navigate('/')
  }

  return (
    <form className='form-control p-5' onSubmit={handleSubmit(onSubmit)}>
      <label className='label' htmlFor="name">
        <span className='label-text'>Name</span>
      </label>
      <input
        {...register('name')}
        className='input input-bordered'
        id="name"
        name="name"
        type="text"
        placeholder='John Doe'
      />
      {errors.name && <p className='mt-2 text-error'>{errors.name.message}</p>}
      <label className='label' htmlFor="email">
        <span className='label-text'>Email</span>
      </label>
      <input
        {...register('email')}
        className='input input-bordered'
        id="email"
        name="email"
        type="email"
      />
      {errors.email && <p className='mt-2 text-error'>{errors.email.message}</p>}
      <label className='label' htmlFor="password">
        <span className='label-text'>Password</span>
      </label>
      <input
        {...register('password')}
        className='input input-bordered'
        id="password"
        name="password"
        type="password"
      />
      {errors.password && <p className='mt-2 text-error'>{errors.password.message}</p>}
      <label className='label' htmlFor="confirmPassword">
        <span className='label-text'>Confirm Password</span>
      </label>
      <input
        {...register('confirmPassword')}
        className='input input-bordered'
        id="confirmPassword"
        name="confirmPassword"
        type="password"
      />
      {errors.confirmPassword && <p className='mt-2 text-error'>{errors.confirmPassword.message}</p>}
      <button disabled={!isValid} className='btn btn-success mt-5' type="submit">Register</button>
    </form>
  );
}

export default Register
