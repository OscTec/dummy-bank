import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '../services/authService';
import ResponseError from '../types/ResponseError';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type FormData = z.infer<typeof schema>

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<ResponseError | null>(null);
  const { handleSubmit, register, formState: { errors, isValid } } = useForm<FormData>({ mode: 'all', resolver: zodResolver(schema) });

  const onSubmit = async (values: FieldValues) => {
    try {
      await login(values.email, values.password);
      navigate('/')
    } catch (error) {
      if (error instanceof Error) setError(error);
      return;
    }
  }

  return (
    <form className='form-control p-5' onSubmit={handleSubmit(onSubmit)}>
      {error?.message && (
        <div className='alert alert-error'>
          {error.message}
        </div>
      )}
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
      <button disabled={!isValid} className='btn btn-success mt-5' type="submit">Log In</button>
    </form>
  );
}

export default Login
