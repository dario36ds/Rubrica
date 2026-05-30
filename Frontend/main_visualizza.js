const host = "http://localhost:8000/api";

// -- LOAD TENDINE -- //
const ContactsTendina = document.getElementById("contactSelect");


const getResult = document.getElementById("backendContactContainer");
const SearchContact = document.getElementById("search");
const GetAllContacts = document.getElementById("btnShowAll");
const SearchField = document.getElementById("searchName");
const SearchButton = document.getElementById("btnSearch");
const UpdateContactButton = document.getElementById("btnUpdateContact");
const NameField = document.getElementById("editName");
const SurnameField = document.getElementById("editSurname");
const FavouritedCheckbox = document.getElementById("editIsFavorite");
const VisualizzaTendina = document.getElementById("contactSelect");
const ModificaTendina = document.getElementById("contactSelectEdit");
const DivTendina = document.getElementById("editContactFormContainer");


SearchButton.addEventListener("click", ()=>{
    apiRequest(host+"/contacts", "GET", {})
    .then(data => {
        VisualizzaTendina.innerHTML="";
        ModificaTendina.innerHTML="";
        for(contatto of data){
            if(contatto.name.includes(SearchField.value)){
                const option=document.createElement("option");
                option.value=contatto.id;
                option.innerHTML=contatto.name + " " + contatto.surname;
                ModificaTendina.appendChild(option);
            
            }
                
        }
        for(contatto of data){
            if(contatto.name.includes(SearchField.value)){
                const option=document.createElement("option");
                option.value=contatto.id;
                option.innerHTML=contatto.name + " " + contatto.surname;
                VisualizzaTendina.appendChild(option);
            
            }
                
        }
    })
})

ModificaTendina.addEventListener("change", () =>{
  DivTendina.style = "display: block";
   apiRequest(host + "/contacts/" + ModificaTendina.value, "GET", {})
  .then((data) => {
    //console.log(data.favourited);
    document.getElementById("editTitle").innerHTML = "";
    document.getElementById("editPhoneContainer").innerHTML = "";
    document.getElementById("editEmailContainer").innerHTML = "";
    document.getElementById("editAddressContainer").innerHTML = "";
    FavouritedCheckbox.checked=false;
    document.getElementById("editTitle").append("Stai modificando il contatto" + " " + data.name + " " + data.surname);
    document.getElementById("editName").placeholder= data.name;
    document.getElementById("editSurname").placeholder= data.surname;
    if(data.favourited==1){
      FavouritedCheckbox.checked=true;
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
      input.className ='form-control edit-address-input';
      input.placeholder = address.address;
      input.id=address.id;

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


VisualizzaTendina.addEventListener("change", () => {
  apiRequest(host + "/contacts/" + VisualizzaTendina.value, "GET", {})
  .then((data) => {
    getResult.style = "display:block";
    document.getElementById("viewDetailName").innerHTML = data.name;
    document.getElementById("viewDetailSurname").innerHTML = data.surname;

    document.getElementById("viewDetailNumeriContainer").innerHTML = "";
    document.getElementById("viewDetailEmailContainer").innerHTML = "";
    document.getElementById("viewDetailIndirizzoContainer").innerHTML = "";
    document.getElementById("viewDetailFavBadge").style = "display:none";

    if(data.favourited==1){
     document.getElementById("viewDetailFavBadge").style = "display:block";
    }
    
    for (numeri of data.phone_numbers) {
      const list = document.createElement("ul");
      const li = document.createElement("li");
      li.innerHTML = numeri.phone_number;
      list.appendChild(li);
      console.log(numeri.phone_number);
      document.getElementById("viewDetailNumeriContainer").appendChild(list);
    }

    for (mail of data.emails) {
      const list = document.createElement("ul");
      const li = document.createElement("li");
      li.innerHTML = mail.mail;
      list.appendChild(li);
      console.log(mail.phone_number);
      document.getElementById("viewDetailEmailContainer").appendChild(list);
    }

    for (address of data.locations) {
      const list = document.createElement("ul");
      const li = document.createElement("li");
      li.innerHTML = address.address;
      list.appendChild(li);
      console.log(address.address);
      document.getElementById("viewDetailIndirizzoContainer").appendChild(list);
    }
  });
});



FavouritedCheckbox.addEventListener("click", ()=>{
    apiRequest(host+"/contacts/"+ ModificaTendina.value, "PUT", {favourited: FavouritedCheckbox.checked})
    .then(data => {
        console.log(data);
    })
    .catch((error) => console.error(error));
});


UpdateContactButton.addEventListener("click", () => {
  apiRequest(host + "/contacts/" + ModificaTendina.value, "PUT", {
    name: NameField.value,
    surname: SurnameField.value,
  })
    .then((data) => {})
    .catch((error) => console.error(error));

    for (putNumero of document.getElementsByClassName("edit-phone-input")) {
      apiRequest(host + "/numbers/" + putNumero.id, "PUT", {
        phone_number: putNumero.value,
      })
        .then((data) => {})
        .catch((error) => console.error(error));
    }

       for (putMail of document.getElementsByClassName("edit-email-input")) {
      apiRequest(host + "/emails/" + putMail.id, "PUT", {
        mail: putMail.value,
      })
        .then((data) => {})
        .catch((error) => console.error(error));
    }

       for (putAddress of document.getElementsByClassName("edit-address-input")) {
      apiRequest(host + "/locations/" + putAddress.id, "PUT", {
        address: putAddress.value,
      })
        .then((data) => {})
        .catch((error) => console.error(error));
    }

  for (nuovoNumero of document.getElementsByClassName("new-phone")) {
    apiRequest(host + "/numbers", "POST", {
      contact_id: ModificaTendina.value,
      phone_number: nuovoNumero.value,
    })
      .then((data) => {})
      .catch((error) => console.error(error));
  }

  for (nuovaMail of document.getElementsByClassName("new-email")) {
    apiRequest(host + "/emails", "POST", {
      contact_id: ModificaTendina.value,
      mail: nuovaMail.value,
    })
      .then((data) => {})
      .catch((error) => console.error(error));
  }

  for (nuovoIndirizzo of document.getElementsByClassName("new-address")) {
    apiRequest(host + "/locations", "POST", {
      contact_id: ModificaTendina.value,
      address: nuovoIndirizzo.value,
    })
      .then((data) => {})
      .catch((error) => console.error(error));
  }
});



function loadContacts(){
  apiRequest(host+"/contacts", 'GET', {})
    .then(data => {
      VisualizzaTendina.innerHTML="";
      for (const contatto of data){
        const option=document.createElement("option");
        option.value=contatto.id;
        option.innerHTML=contatto.name + " " + contatto.surname;
        ModificaTendina.appendChild(option);
      }
      
    })
    .catch(error => console.error(error));
}
loadContacts();

function loadContactsShow(){
  apiRequest(host+"/contacts", 'GET', {})
    .then(data => {
      VisualizzaTendina.innerHTML="";
      for (const contatto of data){
        const option=document.createElement("option");
        option.value=contatto.id;
        option.innerHTML=contatto.name + " " + contatto.surname;
        VisualizzaTendina.appendChild(option);
      }
      
    })
    .catch(error => console.error(error));
}
loadContactsShow();


///--------------------------------///


// Funzione generica per aggiungere un campo di input con bottone "Rimuovi"
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
    removeBtn.onclick = function() {
        row.remove();
    };
    
    row.appendChild(input);
    row.appendChild(removeBtn);
    container.appendChild(row);
}

// Event Listeners per i bottoni "Aggiungi" nel form di modifica
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
