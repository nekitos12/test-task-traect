import React, {SyntheticEvent} from 'react';
interface LoginFormProps {
  login: string
  handleSubmit: (e: SyntheticEvent) => void
  setLogin: (input: string) => void
  isError: boolean

}
const LoginForm = (props: LoginFormProps) => {
  const {handleSubmit, setLogin, login, isError} = props
  return (
    <form className="auth-page__body-form" onSubmit={handleSubmit}>
      <input value={login} onChange={(e) => setLogin(e.target.value)}
             placeholder="Введите номер телефона или электронную почту"
             className={"auth-page__body-input" + `${isError ? ' auth-page__body-input_error' : ""} `}/>
      <button type="submit" className="auth-page__body-button">
        Далее
        <div className="arrow arrow-right auth-page__arrow"/>

      </button>
    </form>
  );
};

export default LoginForm;