export default function header(api, page) {
  const token = localStorage.getItem('token');

  let path = page === 'account' ? 'images/arrow.png' : 'images/arrow_white.png';
  const template = ` <img src="${path}" alt="menu"
                 class="nav-container__icon nav-container__arrow">`;
  if (token) {
    api.getUser()
      .then((data) => {
        document.querySelectorAll('.nav-container__link_logout').forEach((item) => {
          item.textContent = data.data.name;
          item.insertAdjacentHTML('beforeEnd', template);
          item.classList.remove('nav-container__link_is-closed');
        });
        document.querySelectorAll('.nav-container__link_auth').forEach((item) => {
          item.classList.add('nav-container__link_is-closed');
        });
        // Если есть сохраненные карточки, тогда покажем элемент меню Сохраненные
        return api.getArticles()
          .then(() => {
            document.querySelectorAll('.nav-container__link_hidden').forEach((item) => {
              item.classList.remove('nav-container__link_is-closed');
            });
          })
      })
      .catch((err) => {
        err.text()
          .then(error => console.log(JSON.parse(error).message));
      });
  } else {
    document.querySelectorAll('.nav-container__link_logout').forEach((item) => {
      item.classList.add('nav-container__link_is-closed');
    });
    document.querySelectorAll('.nav-container__link_auth').forEach((item) => {
      item.classList.remove('nav-container__link_is-closed');
    });
    document.querySelectorAll('.nav-container__link_hidden').forEach((item) => {
      item.classList.add('nav-container__link_is-closed');
    });
  }
}