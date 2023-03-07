import React from 'react';
interface SuccessLoginProps {
  login: string
}
const SuccessLogin = ({login}: SuccessLoginProps) => {
  return (
    <div>
      Пользователь {login} прошёл авторизацию!
    </div>
  );
};

export default SuccessLogin;