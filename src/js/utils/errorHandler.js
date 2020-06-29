export default function errorHandler (err, handler) {
    if (typeof err.text === 'function') {
      err.text()
        .then(error => handler(JSON.parse(error).message));
    } else {
      err.message === 'Failed to fetch' ? handler('Ошибка подключения к серверу') : handler(err);
    }
};