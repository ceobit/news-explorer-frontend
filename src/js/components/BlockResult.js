export default class BlockResult {
  constructor() {
    this.array = [];
    this.count = 0;
    this.keyWord = '';
  }

  setBlockResult(className) {
    if (className === 'result__found') {
      document.querySelector('.result__found').classList.toggle('result__is-opened');
    }
    if (className === 'result__searching') {
      document.querySelector('.result__searching').classList.toggle('result__is-opened');
    }
    if (className === 'result__not-found') {
      document.querySelector('.result__not-found').classList.toggle('result__is-opened');
    }
  }

  initialBlockResult() {
    document.querySelector('.result__found').classList.remove('result__is-opened');
    document.querySelector('.result__not-found').classList.remove('result__is-opened');
  }
}

