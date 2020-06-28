import errorHandler from "./errorHandler";
import setError from "./setError";

export default function getArticles (mainApi) {
  const articleArray = [];
    mainApi.getArticles()
      .then((res) => {
        res.data.forEach((item) => {
          articleArray.push(item.link);
        });
      })
      .catch((err) => {
        err.text()
          .then(error => console.log(JSON.parse(error).message));
      });
    return articleArray;
}