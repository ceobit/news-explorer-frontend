import errors from "../constants/errors";

const {
  EMAIL_ERROR,
  TWO_SYMBOLS_ERROR,
  EIGHT_SYMBOLS_ERROR,
  THREE_SYMBOLS_ERROR,
  EMPTY_ERROR
} = errors;

export default class Validator {
  checkInput(form) {
    let status = [];
    for (let element of form.elements) {
      if (!element.checkValidity() && element.tagName === "INPUT") {
        this.setErrorMessage(element, this.getCustomValidation(element));
        status.push(element);
      }
    }
    return status.length <= 0;
  }

  setSubmitButtonState(form) {
    if (form.name !== 'searchNews') {
      const popupButton = form.querySelector('.popup__button');
      this.checkInput(form) ? popupButton.classList.add('popup__button_valid') : popupButton.classList.remove('popup__button_valid');
    } else {
      const searchButton = form.querySelector('.search__button');
      if (this.checkInput(form)) {
        searchButton.classList.add('search__button_valid');
      } else {
        searchButton.classList.remove('search__button_valid');
      }
    }
  }

  handleSetEventListeners(event) {
    const form = event.target.form || event.target;
    this.setSubmitButtonState(form);
  }

  setErrorMessage(input, message) {
    let listPopupError;
    if (input.name !== 'search') {
      listPopupError = document.querySelectorAll('.popup__error');
    } else {
      listPopupError = document.querySelectorAll('.search__error');
    }
    listPopupError.forEach(function (item) {
      if (message !== "" && item.previousElementSibling.name === input.name) {
        item.textContent = message;
      }
    });
  }

  //Определяем тип ошибки
  getCustomValidation(input) {
    let errorMessage;
    if (input.validity.patternMismatch) {
      input.name === 'email' ? errorMessage = EMAIL_ERROR : '';
    }
    if (input.validity.tooShort) {
      input.name === 'password' ? errorMessage = EIGHT_SYMBOLS_ERROR : '';
      input.name === 'name' ? errorMessage = TWO_SYMBOLS_ERROR : '';
      input.name === 'search' ? errorMessage = THREE_SYMBOLS_ERROR : '';
    }
    if (input.validity.valueMissing) {
      errorMessage = EMPTY_ERROR;
    }
    return errorMessage;
  }

}