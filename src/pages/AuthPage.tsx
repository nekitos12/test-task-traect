import React, {SyntheticEvent, useMemo, useState} from 'react';
import './authPage.scss'
import LoginForm from "../components/forms/loginForm";
import PasswordForm from "../components/forms/passwordForm";
import SuccessLogin from "../components/forms/successLogin";
import ErrorForm from "../components/forms/errorForm";

const authUsers = [{
  login: 'admin@gmail.com',
  password: 'admin'
},
  {
    login: '+79052515248',
    password: 'admin2'
  }]
export const validateNumber = (str: string): boolean => {
  const regExp = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/
  return regExp.test(str)
}

export const validateEmail = (str: string): boolean => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regExp.test(str)
};
const langPageSelect = [
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'en',
    label: 'Английский',
  }
]


const mapStepToLabel = [
  {
    title: 'Войти в личный кабинет',
    bodyHelper: 'Войдите, чтобы начать использовать платёжные решения PAY2ME.',
    helpers: {
      top: {
        text: 'У вас ещё нет аккаунта?',
        action: 'Зарегистрироваться'
      },
      bottom: {
        text: 'Возникли проблемы со входом?',
        action: 'Восстановить доступ?'
      }
    }
  },
  {
    title: 'Здравствуйте, Пользователь',
    bodyHelper: 'a',
    helpers: {
      top: {
        text: 'Это не мой номер.',
        action: 'Сменить пользователя'
      },
      bottom: {
        text: 'Возникли проблемы со входом?',
        action: 'Восстановить доступ?'
      }
    }
  }
]
const AuthPage = () => {
  const [login, setLogin] = useState('')
  const [step, setStep] = useState(0)
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useState(false)
  const [error, setError] = useState('')
  const handleLoginSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (validateNumber(login) || validateEmail(login)) {
      setStep(prev => prev + 1 <= 2 ? prev + 1 : prev)
      setError('')
    } else {
      setError('uncorrected Format')
    }
  }

  const handlePasswordSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (authUsers.find(({login: currentLogin}) => currentLogin === login)?.password === password) {
      setAuth(true)
      setError('')
    } else {
      setStep(prev => prev + 1 <= 2 ? prev + 1 : prev)
      if (step === 2) setError('uncorrected Data')
    }
  }

  const mapStepToInputType: Record<string, JSX.Element> = useMemo(() => ({
    '0': <LoginForm login={login} setLogin={setLogin} handleSubmit={handleLoginSubmit} isError={error === 'uncorrected Format'}/>,
    '1': <PasswordForm  password={password} setPassword={setPassword} handleSubmit={handlePasswordSubmit} />,
    '2': <ErrorForm  password={password} handleSubmit={handlePasswordSubmit} setPassword={setPassword}  isError={error === 'uncorrected Data'} login={login} setLogin={setLogin} />
  }), [step, login, password, error])

  return (
    <div className="auth-page">
      <div className="auth-page__inner">
        <header className="auth-page__header">
          <div className="arrow arrow-left auth-page__arrow"/>
          Назад
        </header>

        <section className="auth-page__body">
          {auth ? <SuccessLogin login={login}/> :
           step === 2 ? mapStepToInputType[step] :
            <>
              <header className="auth-page__body-header"/>
              <h1 className="auth-page__body-title">{mapStepToLabel[step].title}</h1>
              <p
                className="auth-page__body-helper">{mapStepToLabel[step].bodyHelper === 'a' ? 'Введите пароль для ' + login : mapStepToLabel[step].bodyHelper}</p>
              {mapStepToInputType[String(step)]}
              <footer className="auth-page__form-footer">
                <div className="auth-page__form-helper">
                  <div className="auth-page__form-helper-text">{mapStepToLabel[step].helpers.top.text}</div>
                  <div className="auth-page__form-helper-action">{mapStepToLabel[step].helpers.top.action}</div>
                </div>
                <div className="auth-page__form-helper">
                  <div className="auth-page__form-helper-text">{mapStepToLabel[step].helpers.bottom.text}</div>
                  <div className="auth-page__form-helper-action">{mapStepToLabel[step].helpers.bottom.action}</div>
                </div>
              </footer>
            </>
          }
        </section>


        <footer className="auth-page__footer footer">
          <div className="footer__inner">
            <div className="footer__copyright">
              <p>©PAY2ME 2023</p>
            </div>
            <div className="footer__company">
              <p>ООО «Куарми» ИНН 7743364603</p>
              <p>Юридический адрес 125445, Г. Москва, Ул. Беломорская, Д. 11, К. 1/290</p>
            </div>

            <div className="footer__info">
              <a href="/">Политика конфиденциальности</a>
              <a href="/">Пользовательское соглашение</a>
              <select>
                {langPageSelect.map(({value, label}) => <option value={value}>{label}</option>)}
              </select>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default AuthPage;