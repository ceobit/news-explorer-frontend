import '../pages/index.css';
import MainApi from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';
import Popup from "../js/components/popup";
import Validator from "../js/components/Validation";
import NewsCardList from "../js/components/newsCardList";
import NewsCard from "../js/components/newsCard";
import BlockResult from '../js/components/BlockResult';
import config from "../js/constants/config";
import header from "../js/components/header";
import logout from "../js/utils/logout";
import mobilMenu from "../js/components/mobilMenu";

(function () {

  const { MAINAPI_URL, NEWSAPI_URL, NEWSAPI_TOKEN, PAGE_SIZE, NEWSAPI_DAYS} = config;
  const newsApi = new NewsApi(NEWSAPI_URL, NEWSAPI_TOKEN, PAGE_SIZE, NEWSAPI_DAYS);
  const mainApi = new MainApi(MAINAPI_URL);

  const blockResult = new BlockResult();
  const validator = new Validator();
  const popup = new Popup(mainApi);
  const newsCard = new NewsCard(mainApi);
  const newsCardList = new NewsCardList(newsApi, newsCard, blockResult, validator);
  // Возможно токен уже получен, тогда сделаем авторизацию
  const token = localStorage.getItem('token');
  if (token) {
    header(mainApi, 'index');
  }

  const handleAddRowCard = () =>   {
    for (let i = blockResult.count; i < blockResult.count + 3; i++) {
      blockResult.array[i] ? newsCardList.addArticle(blockResult.array[i], blockResult.keyWord) : document.querySelector('.result__button').classList.add('button_is-closed');
    }
    blockResult.count += 3;
  };

  document.querySelector('.mobil-menu').classList.remove('mobil-menu_is-opened');
  document.querySelector('.result__error').classList.remove('result__is-opened');

  // Обработчики событий POPUP
  document.querySelectorAll('.nav-container__link_auth').forEach(item => {
    item.addEventListener('click', popup.handleOpen);
  });

  document.querySelectorAll('.popup__link').forEach(item => {
    item.addEventListener('click', popup.handleOpen);
  });

  document.addEventListener('click', popup.handleClose.bind(popup));
  document.addEventListener('keydown', popup.handleClose.bind(popup));

  document.querySelectorAll('.popup__close').forEach(item => {
    item.addEventListener('click', popup.handleClosePopup);
  });

  document.querySelectorAll('.popup__form').forEach(item => {
    item.addEventListener('submit', popup.handleSendForm.bind(popup));
  });

  document.querySelectorAll('.popup').forEach(item => {
    item.addEventListener('input',  validator.handleSetEventListeners.bind(validator));
  });

  document.querySelector('.popup__link_success')
    .addEventListener('click',  popup.handleOpen);

  // Обработчики формы поиска
  document.querySelector('.search__form')
    .addEventListener('submit',  newsCardList.handleGetCardList.bind(newsCardList));

  document.querySelector('.search__form')
    .addEventListener('input',  validator.handleSetEventListeners.bind(validator));

  // Обработчики статей
  document.querySelector('.articles')
    .addEventListener('mouseover', newsCard.handleHoverSaveIcon);

  document.querySelector('.articles')
    .addEventListener('mouseout', newsCard.handleHoverOutSaveIcon);

  document.querySelector('.articles')
    .addEventListener('click', newsCard.handleSaveArticle.bind(newsCard));

  document.querySelector('.result__button')
    .addEventListener('click',  handleAddRowCard);

  // Обработчики шапки
  document.querySelectorAll('.nav-container__link_logout').forEach((item) => {
    item.addEventListener('click', logout);
  });

  document.querySelectorAll('.header__menu').forEach((item) => {
    item.addEventListener('click', mobilMenu);
  });


})();