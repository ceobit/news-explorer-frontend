import errorHandler from '../utils/errorHandler';
import setError from '../utils/setError';

export default class NewsCardList {
  constructor(newsApi, newsCard, result, validator) {
    this.newsApi = newsApi;
    this.newsCard = newsCard;
    this.result = result;
    this._container = document.querySelector('.articles');
    this.validator = validator;
  }

  handleGetCardList(event) {
    event.preventDefault();
    const form = document.forms.searchNews;
    this.validator.handleSetEventListeners(event);
    this.clearCardList();

    this.result.initialBlockResult();
    this.result.setBlockResult('result__searching');

    this.newsApi.getArticles(form.elements.search.value)
      .then((data) => {
        this.result.array = data.articles;
        this.result.keyWord = form.elements.search.value;
        if (data.articles.length > 0) {
          this.result.setBlockResult('result__found');
          for (let i = 0; i < 3; i++) {
            this.addArticle(data.articles[i], form.elements.search.value);
          }
          if (data.articles.length > 3) {
            document.querySelector('.result__button').classList.remove('button_is-closed');
            this.result.count = 3;
          }
        } else {
          this.result.setBlockResult('result__not-found');
        }
      })
      .catch((err) => {
        errorHandler(err, setError);
      })
      .finally(() => {
        this.result.setBlockResult('result__searching');
        form.reset();
      });
  }

  addArticle(article, keyWord) {
    const articleItem = this.newsCard.create(article, keyWord);
    let clone = document.importNode(articleItem.content, true);
    this._container.appendChild(clone);
  }

  clearCardList() {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild);
    }
  }

}