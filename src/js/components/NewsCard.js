import getArticles from "../utils/getArticles";
import dateFormat from "../utils/setDate";
import header from "./header";

export default class NewsCard {
  constructor(mainApi) {
    this._mainApi = mainApi;
    this._articlesArray = getArticles(this._mainApi);
  }

  // Елли статья уже сохранена, тогда выведем иконку при загрузке результатов поиска
  setSaveIcon(item) {
    let url = item.url.replace(/amp;/gi, '');
    let result = this._articlesArray.includes(url);

    return result === false ? 'article__icon_empty' : 'article__icon_saved';
  }

  create(element, keyWord) {

    let isSaved = this.setSaveIcon(element);
    let date = dateFormat(element.publishedAt);

    // С помощью тега template добавляем карточки в DOM
    let template = document.querySelector('.article_template');
    template.content.querySelector('.article').setAttribute('data-keyword', keyWord);
    template.content.querySelector('.article__icon_save').classList.add(isSaved);
    isSaved === 'article__icon_saved' ? template.content.querySelector('.article__icon_save').classList.remove('article__icon_empty') :
      template.content.querySelector('.article__icon_save').classList.remove('article__icon_saved');
    template.content.querySelector('.article__link').setAttribute('href', element.url);
    template.content.querySelector('.article__image').setAttribute('src', element.urlToImage);
    template.content.querySelector('.article__date').textContent = date;
    template.content.querySelector('.article__title').textContent = element.title;
    template.content.querySelector('.article__text').textContent = element.description;
    template.content.querySelector('.article__source').textContent = element.source.name;

    return template;
  }

  handleSaveArticle(event) {
    const token = localStorage.getItem('token');
    if (((event.target.classList.contains('article__button') || event.target.classList.contains('article__icon'))
      && !event.target.classList.contains('article__icon_saved')) && token) {
      const article = [];
      const container = event.target.closest('.article');

      article.keyword = container.getAttribute('data-keyword');
      article.title = container.querySelector('.article__title').textContent;
      article.text = container.querySelector('.article__text').textContent;
      article.source = container.querySelector('.article__source').textContent;
      article.date = container.querySelector('.article__date').textContent;
      article.link = container.querySelector('.article__link').getAttribute('href');
      article.image = container.querySelector('.article__image').getAttribute('src');

      // Добавим статью в сохраненные
      this._mainApi.saveArticle(article)
        .then(() => {
          container.querySelector('.article__icon').classList.add('article__icon_saved');
          header(this._mainApi, 'index');
        })
        .catch((err) => {
          err.text()
            .then(error => console.log(JSON.parse(error).message));
        })
    }
  }

  handleHoverSaveIcon(event) {
    const token = localStorage.getItem('token');
    if (event.target.classList.contains('article__button') && !token) {
      event.target.previousElementSibling.classList.remove('article__message_is-closed');
    }
  }

  handleHoverOutSaveIcon(event) {
    if (event.target.classList.contains('article__button')) {
      event.target.previousElementSibling.classList.add('article__message_is-closed');
    }
  }
}