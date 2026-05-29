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
      const input = document.createElement('input');
      input.className ='form-control edit-phone-input';
      input.placeholder = numeri.phone_number;
      document.getElementById("editPhoneContainer").appendChild(input);
    }

    for (mails of data.emails) {
      const input = document.createElement('input');
      input.className ='form-control edit-email-input';
      input.placeholder = mails.mail;
      document.getElementById("editEmailContainer").appendChild(input);
    }

    for (address of data.locations) {
      const input = document.createElement('input');
      input.className ='form-control edit-address-input';
      input.placeholder = address.address;
      document.getElementById("editAddressContainer").appendChild(input);
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
})

UpdateContactButton.addEventListener("click", ()=>{
    apiRequest(host+"/contacts/" + ModificaTendina.value, "PUT", {name: NameField.value , surname: SurnameField.value})
    .then(data => {
        console.log(data);
    })
    .catch((error) => console.error(error));
    loadContacts();
})


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


///--------------------------------_///


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
    createDynamicField('editPhoneContainer', 'tel', 'Nuovo numero', 'edit-phone-input');
});

document.getElementById('btnAddEmailField').addEventListener('click', () => {
    createDynamicField('editEmailContainer', 'email', 'Nuova email', 'edit-email-input');
});

document.getElementById('btnAddAddressField').addEventListener('click', () => {
    createDynamicField('editAddressContainer', 'text', 'Nuovo indirizzo', 'edit-address-input');
});

// Gestione eliminazione intero contatto
document.getElementById('btnDeleteContact').addEventListener('click', function() {
    const selectedId = document.getElementById('contactSelectEdit').value;
    if (!selectedId) return alert('Seleziona prima un contatto!');
    
    if (confirm('Sei sicuro di voler eliminare definitivamente questo contatto?')) {
        
        alert('Contatto eliminato!');
        location.reload(); // Ricarica la pagina per aggiornare le liste
    }
});