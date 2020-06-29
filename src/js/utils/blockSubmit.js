const blockSubmit = (button) => {
  button.hasAttribute('disabled') ? button.removeAttribute('disabled') : button.setAttribute('disabled', 'true');
  };
export default blockSubmit;