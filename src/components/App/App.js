import { useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import SigninPage from '../SignInPage/SigninPage';
import MainPage from '../MainPage/MainPage';
import axios from 'axios';
import './App.css';

axios.interceptors.request.use((req) => {
  if(localStorage.getItem('token')) {
    req.headers.Authorization = `${localStorage.getItem('token')}`;
  }
  return req;
})

axios.interceptors.response.use(
  (res) => {
     return res;
  },
  async (err) => {
      if (err.response.status === 401) {
        try {
          const response = await axios.get('http://localhost:8000/refreshToken', {
            withCredentials: true,
            credentials: 'include'
          })
          const token = response.data.accessToken;
          localStorage.setItem('token', token);

          return axios.request(err.config);
        } catch(e) {
          console.log('not authorized')
        }
      }
  }
);

const App = () => {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <div className="App">
      <Switch>
        <Route path="/signinPage">
          <SigninPage
            setIsAuth={setIsAuth}
          />
        </Route>
        {
          isAuth
          ? <Route path='/mainPage'>
              <MainPage setIsAuth={setIsAuth} />
            </Route>
          : <Redirect path to="/signInPage" />
        }
        <Redirect from='/' to='/mainPage'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
