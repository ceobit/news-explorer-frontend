export default class SavedCard {
  constructor(mainApi) {
    this._mainApi = mainApi;
  }

  create(element) {
    // С помощью тега template добавляем карточки в DOM
    let template = document.querySelector('.article_template');
    template.content.querySelector('.article').setAttribute('data-id', element._id);
    template.content.querySelector('.article__link').setAttribute('href', element.url);
    template.content.querySelector('.article__category').setAttribute('href', element.url);
    template.content.querySelector('.article__image').setAttribute('src', element.image);
    template.content.querySelector('.article__date').textContent = element.date;
    template.content.querySelector('.article__title').textContent = element.title;
    template.content.querySelector('.article__text').textContent = element.text;
    template.content.querySelector('.article__source').textContent = element.source;
    return template;
  }

  handleHoverSaveIcon(event) {
    if (event.target.classList.contains('article__button')) {
      event.target.previousElementSibling.classList.remove('article__message_is-closed');
    }
  }

  handleHoverOutSaveIcon(event) {
    if (event.target.classList.contains('article__button')) {
      event.target.previousElementSibling.classList.add('article__message_is-closed');
    }
  }

  handleDeleteArticle(event) {
    if (event.target.classList.contains('article__button') || event.target.classList.contains('article__icon')) {
      const articleId = event.target.parentElement.getAttribute('data-id') || event.target.parentElement.parentElement.getAttribute('data-id');
      this._mainApi.deleteArticle(articleId)
        .then(() => {
          console.log(`Карточка с id ${articleId} успешно удалена`);
          event.target.parentElement.parentElement.remove();
          return this._mainApi.getArticles()
            .then((res) => {
            })
        })
        .catch((err) => {
          err.text()
            .then(error => console.log(JSON.parse(error).message));
          window.location.href = 'index.html';
        });
    }
  }
}