import { useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import SigninPage from '../SignInPage/SigninPage';
import MainPage from '../MainPage/MainPage';
import axios from 'axios';
import './App.css';

axios.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
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
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/refreshToken`, {
          withCredentials: true,
          credentials: 'include'
        })
        const token = response.data.accessToken;
        localStorage.setItem('token', token);

        return axios.request(err.config);
      } catch (e) {
        console.log('not authorized');
      }
    } 
    
    throw err;
  }
);

const App = () => {
  const access = useSelector(state => state.isAuth.access);

  return (
    <div className="App">
      <Switch>
        <Route path="/signinPage">
          <SigninPage />
        </Route>
        {
          access
            ? <Route path='/mainPage'>
                <MainPage />
              </Route>
            : <Redirect path to="/signInPage" />
        }
        <Redirect from='/' to='/mainPage'></Redirect>
      </Switch>
      <ErrorAlert />
    </div>
  );
}

export default App;
