const form = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const greeting = document.getElementById('greeting');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  greeting.textContent = name ? `Hello, ${name}!` : 'Please enter a name.';
});
