function createDynamicField(containerId, inputType, placeholder, className) {
  const container = document.getElementById(containerId);

  const row = document.createElement('div');
  row.className = 'dynamic-row';

  const input = document.createElement('input');
  input.type = inputType;
  input.className = `form-control ${className}`;
  input.placeholder = placeholder;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn-danger';
  removeBtn.innerText = '❌';
  removeBtn.onclick = function () {
    row.remove();
  };

  row.appendChild(input);
  row.appendChild(removeBtn);
  container.appendChild(row);
}

document.getElementById('btnAddPhoneField').addEventListener('click', () => {
  createDynamicField('editPhoneContainer', 'tel', 'Nuovo numero', 'edit-phone-input new-phone');
});

document.getElementById('btnAddEmailField').addEventListener('click', () => {
  createDynamicField('editEmailContainer', 'email', 'Nuova email', 'edit-email-input new-email');
});

document.getElementById('btnAddAddressField').addEventListener('click', () => {
  createDynamicField('editAddressContainer', 'text', 'Nuovo indirizzo', 'edit-address-input new-address');
});


document.getElementById('btnDeleteContact').addEventListener('click', () => {
  const selectedId = document.getElementById('contactSelectEdit').value;
  if (!selectedId) return alert('Seleziona prima un contatto!');

  if (confirm('Sei sicuro di voler eliminare definitivamente questo contatto?')) {
    apiRequest(host + "/contacts/" + ModificaTendina.value, 'DELETE', {});
    alert('Contatto eliminato!');
    location.reload();
  }
});