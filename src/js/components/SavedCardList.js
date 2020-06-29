import errorHandler from "../utils/errorHandler";
import setError from "../utils/setError";

export default class SavedCardList {
  constructor(mainApi, savedCard) {
    this._mainApi = mainApi;
    this.savedCard = savedCard;
    this._container = document.querySelector('.articles');
  }

  render() {
    this._mainApi.getArticles()
      .then((articles) => {
        for (let article of articles.data) {
          this.addArticle(article)
        }
      })
      .catch((err) => {
        errorHandler(err, setError);
      });
  };

  addArticle(article) {
    const articleItem = this.savedCard.create(article);
    let clone = document.importNode(articleItem.content, true);
    this._container.appendChild(clone);
  }

}