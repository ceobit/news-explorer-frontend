export default function info(mainApi) {
  let name;
  let keyString = '';
  mainApi.getUser()
    .then((data) => {
      name = data.data.name;
      return mainApi.getArticles()
        .then((articles) => {
          document.querySelectorAll('.title').forEach((item) => {
            item.textContent = `${name}, у вас ${articles.data.length} сохраненных статей`;
          });
          let keyWordsArray = articles.data.map(item => item.keyword);
          let accumArray = keyWordsArray.reduce(function (acc, item) {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
          }, []);

          let sortArray = Object.keys(accumArray).sort((a, b) => {
            return accumArray[b] - accumArray[a]
          });

          for (let item = 0; item < sortArray.length; item++) {
            if (sortArray.length > 3) {
              keyString = `${sortArray[0]}, ${sortArray[1]} и ${sortArray.length - 2} другим`;
            } else {
              keyString = keyString + `${sortArray[item]}, `;
            }
          }
          document.querySelector('.info__text_bold').textContent = keyString;
        });
    })
    .catch((err) => {
      err.text()
        .then(error => console.log(JSON.parse(error).message));
    });
}

