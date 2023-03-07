import React, {SyntheticEvent} from 'react';
import {validateEmail} from '../../pages/AuthPage';
interface ErrorFormProps {
  password: string
  handleSubmit: (e: SyntheticEvent) => void
  setPassword: (input: string) => void
  isError: boolean
  login: string
  setLogin: (input: string) => void


}
const ErrorForm = (props: ErrorFormProps) => {
  const {handleSubmit, setPassword, password, isError, login, setLogin} = props
  return (
    <form className="auth-page__error-form" onSubmit={handleSubmit}>
      <header className="auth-page__body-header"/>
      <h1 className="auth-page__body-title">Что-то пошло не так</h1>
      <p
        className="auth-page__body-helper">Вы ввели неверный логин или пароль.</p>
      <div className="auth-page__error">
        <input value={login} onChange={(e) => setLogin(e.target.value)}
               placeholder="Введите номер телефона или электронную почту"
               className={"auth-page__body-input" + `${isError ? ' auth-page__body-input_error' : ""} `}/>
        {Boolean(isError) && <div className="auth-page__error-text">{validateEmail(login) ? 'Возможно, электронная почта введена некорректно. Попробуйте ещё раз.' : 'Возможно, телефон введен некорректно. Попробуйте ещё раз.'}</div>}
      </div>
      <div className="auth-page__error">
        <input value={password} onChange={(e) => setPassword(e.target.value)}
               placeholder="Введите пароль"
               className={"auth-page__body-input" + `${isError? ' auth-page__body-input_error' : ""} `}/>
        {Boolean(isError) && <div  className="auth-page__error-text">Возможно, пароль введён некорректно. Попробуйте ещё раз.</div>}
      </div>

      <button type="submit" className="auth-page__body-button">
        Далее
        <div className="arrow arrow-right auth-page__arrow"/>
      </button>
    </form>
  );
};

export default ErrorForm;