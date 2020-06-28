import '../pages/account/account.css';
import MainApi from '../js/api/MainApi';
import config from "../js/constants/config";
import header from "../js/components/header";
import info from "../js/components/info";
import SavedCardList from "../js/components/SavedCardList";
import SavedCard from "../js/components/SavedCard";
import logout from "../js/utils/logout";
import mobilMenu from "../js/components/mobilMenu";

(function () {
  const { MAINAPI_URL } = config;
  const mainApi = new MainApi(MAINAPI_URL);

  const savedCard = new SavedCard(mainApi);
  const savedCardList = new SavedCardList(mainApi, savedCard);

  // Возможно токен уже получен, тогда сделаем авторизацию
  const token = localStorage.getItem('token');
  if (token) {
    header(mainApi, 'account');
    info(mainApi);
    savedCardList.render();
  } else {
    window.location.href = 'index.html';
  }

  document.querySelector('.mobil-menu').classList.remove('mobil-menu_is-opened');

  document.querySelectorAll('.nav-container__link_logout').forEach((item) => {
    item.addEventListener('click', logout);
  });
  document.querySelector('.articles')
    .addEventListener('mouseover', savedCard.handleHoverSaveIcon);

  document.querySelector('.articles')
    .addEventListener('mouseout', savedCard.handleHoverOutSaveIcon);

  document.querySelector('.articles')
    .addEventListener('click', savedCard.handleDeleteArticle.bind(savedCard));

  document.querySelectorAll('.header__menu').forEach((item) => {
    item.addEventListener('click', mobilMenu);
  });


})();