import header from '../components/header';

export default function logout() {
  localStorage.removeItem('token');
  header();
  window.location.href = 'index.html';
}