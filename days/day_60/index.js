const form = document.getElementById('form');
const textarea = document.getElementById('textarea');

const text = localStorage.getItem('text');
if (text) {
  textarea.value = text;
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  this.reset();
  localStorage.setItem('text', textarea.value);
});

textarea.addEventListener('input', function() {
  localStorage.setItem('text', textarea.value);
});