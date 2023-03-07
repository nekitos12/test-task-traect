import React, {SyntheticEvent} from 'react';
import './../../pages/authPage.scss'
interface PasswordFormProps {
  password: string
  handleSubmit: (e: SyntheticEvent) => void
  setPassword: (input: string) => void

}
const PasswordForm = (props: PasswordFormProps) => {
  const {handleSubmit, setPassword, password} = props
  return (
    <form className="auth-page__body-form" onSubmit={handleSubmit}>
      <div style={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
        <input value={password} onChange={(e) => setPassword(e.target.value)}
               placeholder="Введите пароль"
               className={"auth-page__body-input "}/>
      </div>

      <button type="submit" className="auth-page__body-button">
        Далее
        <div className="arrow arrow-right auth-page__arrow"/>

      </button>

    </form>
  );
};

export default PasswordForm;