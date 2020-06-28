export default class NewsApi {
  constructor(url, token, pageSize, days) {
    this.url = url;
    this.token = token;
    this.pageSize = pageSize;
    this.period(days);
  }

  period (days) {
    this.now = new Date();
    this.from = new Date(+this.now - 3600 * 24 * 1000 * days).toISOString().slice(0, 19);
    this.to = this.now.toISOString().slice(0, 19);
  }

  getArticles(keyWord) {
    return fetch( `${this.url}?q=${keyWord}&from=${this.from}&to=${this.to}&pageSize=${this.pageSize}`, {
      method: 'GET',
      headers: {
        authorization: this.token,
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