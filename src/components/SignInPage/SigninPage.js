import { useState } from 'react';
import {
  Button,
  Label,
  Input,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../redux/slices/errorAlertSlice';
import { allowAccess } from '../../redux/slices/isAuthSlice';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './SigninPage.scss';

const SigninPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);

  const history = useHistory();

  const register = async () => {
    const regexLogin = /[A-Za-z0-9]{6,}/;
    const regexPassword = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$");

    if (login) {
      if (!regexLogin.test(login)) {
        dispatch(setAlert(`The login must contain latin letters and numbers only. 
          It must have 6 symbols at least.`));
        return;
      }
    } else {
      dispatch(setAlert('Please, print your login.'));
      return;
    }

    if (password) {
      if (!regexPassword.test(password)) {
        setPassword('');
        dispatch(setAlert(`The password must contain only latin letters and numbers. 
          It must have at least 1 capital and 1 lowercase letter, and 1 number.
          It mustn't be shorter than 6 symbols.`));
        return;
      }
    } else {
      dispatch(setAlert('Please, print your password.'));
      return;
    }

    if (password !== repeatedPassword) {
      setRepeatedPassword('');
      dispatch(setAlert('Password dismatch.'));
      return;
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/createNewUser`, {
      login,
      password
    }, {
      withCredentials: true, 
      credentials: 'include'
    })
    .then(result => {
      const { data } = result;
      dispatch(allowAccess());
      localStorage.setItem('token', data.accessToken);
      history.push('/mainPage');
    })
    .catch(e => {
      if (e.message.endsWith('400')) {
        dispatch(setAlert('Error 400. This login is already used'));
      } else {
        dispatch(setAlert(e.message));
      }
    });
  }

  const authoriseOrRegister = () => {
    isRegistration
    ? register()
    : authorise();
  }

  const authorise = async () => {
    if (!login) {
      dispatch(setAlert('Please, print your login.'));
      return;
    }

    if (!password) {
      dispatch(setAlert('Please, print your password.'));
      return;
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/authorise`, {
      login,
      password,
    }, {
      withCredentials: true, 
      credentials: 'include'
    })
    .then(result => {
      const { data } = result;
      dispatch(allowAccess());
      localStorage.setItem('token', data.accessToken);
      history.push('/mainPage');
    })
    .catch(e => {
      dispatch(setAlert(e.message));
    });
  }

  return (
    <div className="signin-page-wrapper">
      <div className="signin-central-window">
        <header>
          {isRegistration
            ? 'Register'
            : 'Sign In'
          }
        </header>
        <section>
          <div className="signin-input-wrapper">
            <Label
              for="login"
              size="lg"
            >
              Login
            </Label>
            <Input
              id="login"
              name="login"
              size="lg"
              placeholder="Enter your login, please"
              value={login}
              onChange={(e) => setLogin(e.currentTarget.value)}
              type="text"
            />
          </div>
          <div className="signin-input-wrapper">
            <Label
              for="password"
              size="lg"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              size="lg"
              placeholder="Enter your password, please"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
            />
          </div>
          {
            isRegistration &&
            <div className="signin-input-wrapper">
              <Label
                for="repeated-password"
                size="lg"
              >
                Repeate your password
              </Label>
              <Input
                id="repeated-password"
                name="repeated-password"
                size="lg"
                placeholder="Repeate your password, please"
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.currentTarget.value)}
                type="password"
              />
            </div>
          }
        </section>
        <footer>
          <Button
            color="primary"
            size="lg"
            onClick={authoriseOrRegister}
          >
            Submit
          </Button>
          <p
            onClick={() => setIsRegistration(!isRegistration)}
          >
            {
              isRegistration
                ? 'Go to the sign in page'
                : 'Go to the registration page'
            }
          </p>
        </footer>
      </div>
    </div>
  )
}

export default SigninPage;