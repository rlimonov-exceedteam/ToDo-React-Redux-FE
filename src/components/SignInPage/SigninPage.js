import { useState } from 'react';
import {
  Button,
  Label,
  Input,
} from 'reactstrap';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import './SigninPage.scss';

const SigninPage = ({ setIsAuth }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, text: '' });
  const { isOpen, text } = alert;

  const history = useHistory();

  const register = async () => {
    const regexLogin = /[A-Za-z0-9]{6,}/;
    const regexPassword = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$");

    if (login) {
      if (!regexLogin.test(login)) {
        setAlert({
          text: 'The login must contain latin letters and numbers only. It must have 6 symbols at least.',
          opened: true
        });
        return;
      }
    } else {
      setAlert({
        text: 'Please, print your login.',
        opened: true
      });
      return;
    }

    if (password) {
      if (!regexPassword.test(password)) {
        setPassword('');
        setAlert({
          text: `The password must contain only latin letters and numbers. 
              It must have at least 1 capital and 1 lowercase letter, and 1 number.
              It mustn't be shorter than 6 symbols.`,
          opened: true
        });
        return;
      }
    } else {
      setAlert({
        text: 'Please, print your password.',
        opened: true
      });
      return;
    }

    if (password !== repeatedPassword) {
      setRepeatedPassword('');
      setAlert({
        text: 'Password dismatch.',
        opened: true
      });
      return;
    }

    await axios.post('http://localhost:8000/createNewUser', {
      login,
      password
    }, {
      withCredentials: true, 
      credentials: 'include'
    }).then(result => {
      const { data } = result;
      setIsAuth(true);
      localStorage.setItem('token', data.accessToken);
      history.push('/mainPage');
    }).catch(e => {
      if (e.message.endsWith('400')) {
        setAlert({
          text: "Error 400. This login is already used",
          opened: true
        });
      } else {
        setAlert({
          text: e.message,
          opened: true
        });
      }
    });
  }

  const authorise = async () => {
    if (!login) {
      setAlert({
        text: 'Please, print your login.',
        opened: true
      });
      return;
    }

    if (!password) {
      setAlert({
        text: 'Please, print your password.',
        opened: true
      });
      return;
    }

    await axios.post('http://localhost:8000/authorise', {
      login,
      password,
    }, {
      withCredentials: true, 
      credentials: 'include'
    }).then(result => {
      const { data } = result;
      setIsAuth(true);
      localStorage.setItem('token', data.accessToken);
      history.push('/mainPage');
    }).catch(e => {
      setAlert({
        text: e.message,
        opened: true
      });
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
            onClick={
              () => isRegistration
                ? register()
                : authorise()
            }
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
      <ErrorAlert
        text={text}
        isOpen={isOpen}
        setAlert={setAlert}
      />
    </div>
  )
}

export default SigninPage;