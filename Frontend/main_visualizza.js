
const host = "http://localhost:8000/api";


const ContactsTendina = document.getElementById("contactSelect");


const getResult = document.getElementById("backendContactContainer");
const SearchContact = document.getElementById("search");
const GetAllContacts = document.getElementById("btnShowAll");
const SearchField = document.getElementById("searchName");
const SearchButton = document.getElementById("btnSearch");
const UpdateContactButton = document.getElementById("btnUpdateContact");
const NameField = document.getElementById("editName");
const SurnameField = document.getElementById("editSurname");
const DescriptionField = document.getElementById("editDescription");
const FavouritedCheckbox = document.getElementById("editIsFavorite");
const VisualizzaTendina = document.getElementById("contactSelect");
const ModificaTendina = document.getElementById("contactSelectEdit");
const DivTendina = document.getElementById("editContactFormContainer");



SearchField.addEventListener("input", () => {
  getResult.style="display:none";
  apiRequest(host + "/contacts", "GET", {})
    .then(data => {
      VisualizzaTendina.innerHTML = "";
      ModificaTendina.innerHTML = "";

      for (contatto of data) {
        if (contatto.name.includes(SearchField.value) || contatto.name.includes(SearchField.value)) {
          const option = document.createElement("option");
          option.value = contatto.id;
          option.innerHTML = contatto.name + " " + contatto.surname;
          ModificaTendina.appendChild(option);

        }

      }
      let trovato = false;
      for (contatto of data) {
        if (contatto.name.includes(SearchField.value) || contatto.surname.includes(SearchField.value)) {
          trovato = true;
          const div = document.createElement("div");
          div.value = contatto.id;
          div.innerHTML = contatto.name + " " + contatto.surname;
          div.onclick = () => {
            vedi(div.value);
          }
          div.className = "voce-contatto";
          VisualizzaTendina.appendChild(div);
        }
      }
      if (!trovato) {
        const div = document.createElement("div");

        div.innerHTML = "Nessun contatto trovato";

        VisualizzaTendina.appendChild(div);
      }
    })
})

function caricaContatti() {
  apiRequest(host + "/contacts", "GET", {}).then(
    data => {
      let trovato = false;
      for (contatto of data) {
        if (contatto.name.includes(SearchField.value) || contatto.surname.includes(SearchField.value)) {
          trovato = true;
          const div = document.createElement("div");
          div.value = contatto.id;
          div.innerHTML = contatto.name + " " + contatto.surname;
          div.onclick = () => {
            vedi(div.value);
          }
          div.className = "voce-contatto";
          VisualizzaTendina.appendChild(div);
        }
      }
      if (!trovato) {
        const div = document.createElement("div");
        div.innerHTML = "Nessun contatto presente";
        VisualizzaTendina.appendChild(div);
      }
    }
  )
}

document.addEventListener("DOMContentLoaded", () => {
  caricaContatti();
})




ModificaTendina.addEventListener("change", () => {
  DivTendina.style = "display: block";
  apiRequest(host + "/contacts/" + ModificaTendina.value, "GET", {})
    .then((data) => {

      document.getElementById("editTitle").innerHTML = "";
      document.getElementById("editPhoneContainer").innerHTML = "";
      document.getElementById("editEmailContainer").innerHTML = "";
      document.getElementById("editAddressContainer").innerHTML = "";
      FavouritedCheckbox.checked = false;
      document.getElementById("editTitle").append("Stai modificando il contatto" + " " + data.name + " " + data.surname);
      NameField.placeholder = data.name;
      SurnameField.placeholder = data.surname;
      DescriptionField.placeholder = data.description;
      if (data.favourited == 1) {
        FavouritedCheckbox.checked = true;
      }

      for (numeri of data.phone_numbers) {
        const riga = document.createElement("div");
        riga.className = "dynamic-row";

        const input = document.createElement("input");
        input.className = "form-control edit-phone-input";
        input.placeholder = numeri.phone_number;
        input.id = numeri.id;

        const elimina = document.createElement("button");
        elimina.className = "btn-remove-field";
        elimina.innerHTML = "❌";
        elimina.onclick = () => {
          apiRequest(host + "/numbers/" + input.id, 'DELETE', {});
          riga.remove();
        }

        riga.appendChild(input);
        riga.appendChild(elimina);
        document.getElementById("editPhoneContainer").appendChild(riga);
      }

      for (mails of data.emails) {
        const riga = document.createElement("div");
        riga.className = "dynamic-row";

        const input = document.createElement('input');
        input.className = 'form-control edit-email-input';
        input.placeholder = mails.mail;
        input.id = mails.id;

        const elimina = document.createElement("button");
        elimina.className = "btn-remove-field";
        elimina.innerHTML = "❌";
        elimina.onclick = () => {
          apiRequest(host + "/emails/" + input.id, 'DELETE', {});
          riga.remove();
        }

        riga.appendChild(input);
        riga.appendChild(elimina);
        document.getElementById("editEmailContainer").appendChild(riga);
      }

      for (address of data.locations) {
        const riga = document.createElement("div");
        riga.className = "dynamic-row";

        const input = document.createElement('input');
        input.className = 'form-control edit-address-input';
        input.placeholder = address.address;
        input.id = address.id;

        const elimina = document.createElement("button");
        elimina.className = "btn-remove-field";
        elimina.innerHTML = "❌";
        elimina.onclick = () => {
          apiRequest(host + "/locations/" + input.id, 'DELETE', {});
          riga.remove();
        }

        riga.appendChild(input);
        riga.appendChild(elimina);
        document.getElementById("editAddressContainer").appendChild(riga);
      }

    })
});



function vedi(id) {
  getResult.style = "display:block";
  apiRequest(host + "/contacts/" + id, "GET", {}).then(
    (data) => {
      getResult.style = "display:block";
      document.getElementById("viewDetailName").innerHTML = data.name;
      document.getElementById("viewDetailSurname").innerHTML = data.surname;
      document.getElementById("viewDetailNumeriContainer").innerHTML = "";
      document.getElementById("viewDetailEmailContainer").innerHTML = "";
      document.getElementById("viewDetailIndirizzoContainer").innerHTML = "";
      document.getElementById("viewDetailDescription").innerHTML = "";
      document.getElementById("viewDetailFavBadge").style = "display:none";

      if (data.description != null) {
        document.querySelector(".detail-card.detail-card--purple").style = "display: block";
        document.getElementById("viewDetailDescription").innerHTML = data.description;
      } else {
        document.querySelector(".detail-card.detail-card--purple").style = "display: none";
      }

      if (data.favourited == 1) {
        document.getElementById("viewDetailFavBadge").style = "display:block";
      }

      if (data.phone_numbers.length != 0) {
        document.querySelector(".detail-card.detail-card--cyan").style = "display: block";
        for (numeri of data.phone_numbers) {
          const list = document.createElement("ul");
          const li = document.createElement("li");
          li.innerHTML = numeri.phone_number;
          list.appendChild(li);
          list.style = "margin-left:20px;"
          document.getElementById("viewDetailNumeriContainer").appendChild(list);
        }
      } else {
        document.querySelector(".detail-card.detail-card--cyan").style = "display: none";
      }

      if (data.emails.length != 0) {
        document.querySelector(".detail-card.detail-card--orange").style = "display: block";
        for (mail of data.emails) {
          const list = document.createElement("ul");
          const li = document.createElement("li");
          li.innerHTML = mail.mail;
          list.appendChild(li);
          list.style = "margin-left:20px;"
          document.getElementById("viewDetailEmailContainer").appendChild(list);
        }
      } else {
        document.querySelector(".detail-card.detail-card--orange").style = "display: none";
      }

      if (data.locations.length != 0) {
        document.querySelector(".detail-card.detail-card--teal").style = "display: block";
        for (address of data.locations) {
          const list = document.createElement("ul");
          const li = document.createElement("li");
          li.innerHTML = address.address;
          list.appendChild(li);
          list.style = "margin-left:20px;"
          document.getElementById("viewDetailIndirizzoContainer").appendChild(list);
        }
      } else {
        document.querySelector(".detail-card.detail-card--teal").style = "display: none";
      }
    }
  );
}




FavouritedCheckbox.addEventListener("click", () => {
  apiRequest(host + "/contacts/" + ModificaTendina.value, "PUT", { favourited: FavouritedCheckbox.checked })
    .then(data => {
      console.log(data);
    })
    .catch((error) => console.error(error));
});

UpdateContactButton.addEventListener("click", () => {

 const body = {};
if (NameField.value) {body.name = NameField.value;}
if (SurnameField.value) {body.surname = SurnameField.value;}
if (DescriptionField.value) {body.description = DescriptionField.value;}

if (body.name || body.surname || body.description) {
    apiRequest(host + "/contacts/" + ModificaTendina.value, "PUT", body);
}

  for (putNumero of document.getElementsByClassName("edit-phone-input")) {
    apiRequest(host + "/numbers/" + putNumero.id, "PUT", {
      phone_number: putNumero.value,
    })
      .then((data) => { })
      .catch((error) => console.error(error));
  }

  for (putMail of document.getElementsByClassName("edit-email-input")) {
    apiRequest(host + "/emails/" + putMail.id, "PUT", {
      mail: putMail.value,
    })
      .then((data) => { })
      .catch((error) => console.error(error));
  }

  for (putAddress of document.getElementsByClassName("edit-address-input")) {
    apiRequest(host + "/locations/" + putAddress.id, "PUT", {
      address: putAddress.value,
    })
      .then((data) => { })
      .catch((error) => console.error(error));
  }

  for (nuovoNumero of document.getElementsByClassName("new-phone")) {
    apiRequest(host + "/numbers", "POST", {
      contact_id: ModificaTendina.value,
      phone_number: nuovoNumero.value,
    })
      .then((data) => { })
      .catch((error) => console.error(error));
  }

  for (nuovaMail of document.getElementsByClassName("new-email")) {
    apiRequest(host + "/emails", "POST", {
      contact_id: ModificaTendina.value,
      mail: nuovaMail.value,
    })
      .then((data) => { })
      .catch((error) => console.error(error));
  }

  for (nuovoIndirizzo of document.getElementsByClassName("new-address")) {
    apiRequest(host + "/locations", "POST", {
      contact_id: ModificaTendina.value,
      address: nuovoIndirizzo.value,
    })
      .then((data) => { })
      .catch((error) => console.error(error));
  }
  DivTendina.style = "display: none";
  alert('Contatto aggiornato!');
});



function loadContacts() {
  apiRequest(host + "/contacts", 'GET', {})
    .then(data => {

      for (const contatto of data) {
        const option = document.createElement("option");
        option.value = contatto.id;
        option.innerHTML = contatto.name + " " + contatto.surname;
        ModificaTendina.appendChild(option);
      }

    })
    .catch(error => console.error(error));
}
loadContacts();

function loadContactsShow() {
  apiRequest(host + "/contacts", 'GET', {})
    .then(data => {
      for (const contatto of data) {
        const option = document.createElement("option");
        option.value = contatto.id;
        option.innerHTML = contatto.name + " " + contatto.surname;
        VisualizzaTendina.appendChild(option);
      }

    })
    .catch(error => console.error(error));
}
loadContactsShow();


///--------------------------------///


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
