export default function setError(err) {
  document.querySelectorAll('.auth__error').forEach(item => {
    item.textContent = err;
  });
  err === 'Ошибка подключения к серверу' ? document.querySelector('.result__error').classList.add('result__is-opened') : '';
}