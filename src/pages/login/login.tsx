import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { getUserErrorSelector, loginUser } from '@slices';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getUserErrorSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
