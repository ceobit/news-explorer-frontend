const blockInput = (form) => {
  for (let element of form.elements) {
    if (element.tagName === "INPUT") {
      element.hasAttribute('readonly') ? element.removeAttribute('readonly') : element.setAttribute('readonly', 'true');
    }
  }
};
export default blockInput;