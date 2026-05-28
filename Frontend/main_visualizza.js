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
//GET//
/*
GetAllContacts.addEventListener("click", () => {
  apiRequest(host + "/contacts", "GET")
    .then((data) => {
      const table = document.createElement("table");
      const trH = document.createElement("tr");
      const th = document.createElement("th");
      const th1 = document.createElement("th");
      th.textContent = "Nome";
      th1.textContent = "Cognome";
      trH.appendChild(th);
      trH.appendChild(th1);
      table.appendChild(trH);
      getResult.innerHTML = "";
      for (const contatto of data) {
        const tr = document.createElement("tr");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        tr.id = contatto.id;
        td2.innerHTML = contatto.name;
        td3.innerHTML = contatto.surname;
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
      }
      getResult.appendChild(table);
    })
   
    .catch((error) => console.error(error));
});
*/

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
    document.getElementById("editTitle").innerHTML = "";
    document.getElementById("editTitle").append("Stai modificando il contatto" + " " + data.name + " " + data.surname);
    document.getElementById("editName").placeholder= data.name;
    document.getElementById("editSurname").placeholder= data.surname;

    for (numeri of data.phone_numbers) {
      const input = document.createElement("input");
      input.type="tel";
      input.style="form-control";
      console.log(numeri.phone_number);
      document.getElementById("numbercontainer").appendChild(input);
    }
    document.getElementById("editNumber").placeholder= data.phone_numbers.phone_number;
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
    document.getElementById("viewDetailIndirizzo").innerHTML = "";

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
      document.getElementById("viewDetailIndirizzo").appendChild(list);
    }
  });
});



FavouritedCheckbox.addEventListener("click", ()=>{
    apiRequest(host+"/contacts/"+ VisualizzaTendina.value, "PUT", {favourited: FavouritedCheckbox.checked})
    .then(data => {
        console.log(data);
    })
    .catch((error) => console.error(error));
    loadContacts();
})

UpdateContactButton.addEventListener("click", ()=>{
    apiRequest(host+"/contacts/" + VisualizzaTendina.value, "PUT", {name: NameField.value , surname: SurnameField.value})
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