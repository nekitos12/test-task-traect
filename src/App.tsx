import React from 'react';
import './index.scss'
import AuthPage from "./pages/AuthPage";
const App = () => {

  return (
    <div className="app">
      <div className="app__inner">
        <AuthPage />
        <div className="banner">
          <div className="banner__inner"/>
        </div>
      </div>
    </div>
  )
}

export default App;