import errorHandler from './errorHandler';
import setError from './setError';
import blockInput from "./blockInput";

export default function auth(api, event) {
  const formName = event.target.getAttribute('name');
  if (formName === 'signup') {
    api.signup(document.forms.signup)
      .then(() => {
        blockInput(document.forms.signup);
        event.target.closest('.popup').classList.remove('popup_is-opened');
        document.querySelector('.popup__success').classList.add('popup_is-opened');
      })
      .catch(err => {
        errorHandler(err, setError);
      })
      .finally(() => {
        blockInput(document.forms.signup);
      })
  }
  if (formName === 'signin') {
    api.signin(document.forms.signin)
      .then((data) => {
        blockInput(document.forms.signin);
        const { token } = data;
        localStorage.setItem('token', token);
        event.target.closest('.popup').classList.remove('popup_is-opened');
      })
      .catch(err => {
        errorHandler(err, setError);
      })
      .finally(() => {
        blockInput(document.forms.signin);
        window.location.href = 'index.html';
      })
  }
}