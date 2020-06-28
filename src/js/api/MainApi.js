export default class MainApi {
  constructor(url) {
    this.url = url;
    this.token = localStorage.getItem('token');
  }

  signup(data) {
    return fetch(`${this.url}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name.value,
        email: data.email.value,
        password: data.password.value,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  signin(data) {
    return fetch(`${this.url}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email.value,
        password: data.password.value
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  getUser() {
    return fetch(`${this.url}users/me`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  saveArticle(article) {
    return fetch(`${this.url}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        source: article.source,
        link: article.link,
        image: article.image,
        date: article.date
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  getArticles(){
    return fetch(`${this.url}articles`, {
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }

  deleteArticle(articleId){
    return fetch(`${this.url}articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      });
  }
}