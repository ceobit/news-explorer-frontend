export default function clearAuthError() {
  document.querySelectorAll('.auth__error').forEach((item => {
    item.textContent = '';
  }))
}