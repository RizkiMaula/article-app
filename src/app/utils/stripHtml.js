export function stripHTML(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
