const STORAGE_KEY = 'nametracker_contacts';

// --- Storage helpers ---
function loadContacts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// --- DOM refs ---
const form        = document.getElementById('contactForm');
const editIdField = document.getElementById('editId');
const nameField   = document.getElementById('name');
const dateField   = document.getElementById('date');
const locationField    = document.getElementById('location');
const associationField = document.getElementById('association');
const tagsField   = document.getElementById('tags');
const notesField  = document.getElementById('notes');
const submitBtn   = document.getElementById('submitBtn');
const cancelBtn   = document.getElementById('cancelBtn');
const formTitle   = document.getElementById('formTitle');
const searchInput = document.getElementById('searchInput');
const contactList = document.getElementById('contactList');
const emptyState  = document.getElementById('emptyState');
const resultCount = document.getElementById('resultCount');

// --- Form submit (add or update) ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = editIdField.value || generateId();
  const contact = {
    id,
    name:        nameField.value.trim(),
    date:        dateField.value,
    location:    locationField.value.trim(),
    association: associationField.value.trim(),
    tags:        tagsField.value.split(',').map(t => t.trim()).filter(Boolean),
    notes:       notesField.value.trim(),
    createdAt:   editIdField.value ? undefined : Date.now(),
  };

  let contacts = loadContacts();

  if (editIdField.value) {
    const idx = contacts.findIndex(c => c.id === editIdField.value);
    if (idx !== -1) {
      contact.createdAt = contacts[idx].createdAt;
      contacts[idx] = contact;
    }
  } else {
    contacts.unshift(contact);
  }

  saveContacts(contacts);
  resetForm();
  renderList(searchInput.value);
});

// --- Cancel edit ---
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  form.reset();
  editIdField.value = '';
  formTitle.textContent = 'Add New Contact';
  submitBtn.textContent = 'Save Contact';
  cancelBtn.hidden = true;
}

// --- Search ---
searchInput.addEventListener('input', () => renderList(searchInput.value));

// --- Render ---
function renderList(query = '') {
  const q = query.toLowerCase().trim();
  let contacts = loadContacts();

  const filtered = q
    ? contacts.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.association.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        (c.notes && c.notes.toLowerCase().includes(q))
      )
    : contacts;

  contactList.innerHTML = '';

  resultCount.textContent = q
    ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`
    : contacts.length > 0 ? `${contacts.length} contact${contacts.length !== 1 ? 's' : ''}` : '';

  emptyState.hidden = contacts.length > 0;

  filtered.forEach(contact => {
    contactList.appendChild(buildCard(contact));
  });
}

function buildCard(c) {
  const card = document.createElement('div');
  card.className = 'contact-card';
  card.dataset.id = c.id;

  const dateStr = c.date
    ? new Date(c.date + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  const tagsHtml = c.tags.length
    ? `<div class="tags">${c.tags.map(t => `<span class="tag">${escHtml(t)}</span>`).join('')}</div>`
    : '';

  const notesHtml = c.notes
    ? `<p class="notes-text">${escHtml(c.notes)}</p>`
    : '';

  card.innerHTML = `
    <div class="contact-name">${escHtml(c.name)}</div>
    <div class="contact-date">${escHtml(dateStr)}</div>
    <div class="meta">
      ${c.location    ? `<span><span class="label">Location</span>${escHtml(c.location)}</span>` : ''}
      ${c.association ? `<span><span class="label">Association</span>${escHtml(c.association)}</span>` : ''}
    </div>
    ${tagsHtml}
    ${notesHtml}
    <div class="card-actions">
      <button class="btn-edit" data-id="${c.id}">Edit</button>
      <button class="btn-delete" data-id="${c.id}">Delete</button>
    </div>
  `;

  card.querySelector('.btn-edit').addEventListener('click', () => startEdit(c.id));
  card.querySelector('.btn-delete').addEventListener('click', () => deleteContact(c.id));

  return card;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// --- Edit ---
function startEdit(id) {
  const contact = loadContacts().find(c => c.id === id);
  if (!contact) return;

  editIdField.value      = contact.id;
  nameField.value        = contact.name;
  dateField.value        = contact.date;
  locationField.value    = contact.location;
  associationField.value = contact.association;
  tagsField.value        = contact.tags.join(', ');
  notesField.value       = contact.notes || '';

  formTitle.textContent  = 'Edit Contact';
  submitBtn.textContent  = 'Update Contact';
  cancelBtn.hidden       = false;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Delete ---
function deleteContact(id) {
  if (!confirm('Delete this contact?')) return;
  const contacts = loadContacts().filter(c => c.id !== id);
  saveContacts(contacts);
  renderList(searchInput.value);
}

// --- Init ---
renderList();
