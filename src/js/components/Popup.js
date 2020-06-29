import auth from '../utils/auth';
import clearAuthError from "../utils/clearAuthError";

export default class Popup {
  constructor(mainApi) {
    this._mainApi = mainApi;
  }

  handleOpen(event) {
    const popupSignIn = document.querySelector('.popup__signin');
    const popupSignUp = document.querySelector('.popup__signup');
    const popupSuccess = document.querySelector('.popup__success');
    const token = localStorage.getItem('token');

    if (token) {
      localStorage.removeItem(token);
    } else {

      if (event.target.classList.contains('nav-container__link_auth') || event.target.classList.contains('popup__link_success')) {
        popupSignIn.classList.add('popup_is-opened');
        popupSuccess.classList.remove('popup_is-opened');
      }

      if (event.target.classList.contains('popup__link')) {
        if (event.target.classList.contains('popup__link_signup')) {
          popupSignIn.classList.remove('popup_is-opened');
          popupSignUp.classList.add('popup_is-opened');
        } else {
          popupSignUp.classList.remove('popup_is-opened');
          popupSignIn.classList.add('popup_is-opened');
        }
        clearAuthError();
      }
    }
  }

  handleClosePopup(event) {
    event.target.closest('.popup').classList.remove('popup_is-opened');
    clearAuthError();
  }

  // Закрываем popup при клике на область вне попапа и по esc
  close(event) {
    if ((!event.target.closest('.popup__content') && !event.target.closest('.nav-container__link')) || event.keyCode === 27) {
      document.querySelectorAll('.popup').forEach((item => {
        item.classList.remove('popup_is-opened');
        clearAuthError();
      }))
    }
  }

  handleClose(event) {
    this.close(event);
  }

  handleSendForm(event) {
    event.preventDefault();
    auth(this._mainApi, event);
  }


}