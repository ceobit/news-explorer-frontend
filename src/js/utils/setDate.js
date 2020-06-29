 export default function dateFormat (datePublished) {
  const formatter = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: "numeric",
  });
  return formatter.format(new Date(datePublished.slice(0, 10)));
}