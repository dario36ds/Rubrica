const host = "http://localhost:8000/api";

// -- LOAD TENDINE -- //
const ContactsTendina = document.getElementById("contactSelect");


const getResult = document.getElementById("backendContactContainer");
const SearchContact = document.getElementById("search");
const GetAllContacts = document.getElementById("btnShowAll");
const select = document.getElementById("contactSelect");
const SearchField = document.getElementById("searchName");
const SearchButton = document.getElementById("btnSearch");
const UpdateContactButton = document.getElementById("btnUpdateContact");
const NameField = document.getElementById("editName");
const SurnameField = document.getElementById("editSurname");
const FavouritedCheckbox = document.getElementById("editIsFavorite");
const VisualizzaTendina = document.getElementById("contactSelect");
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
        select.innerHTML="";
        for(contatto of data){
            if(contatto.name.includes(SearchField.value)){
                const option=document.createElement("option");
                option.value=contatto.id;
                option.innerHTML=contatto.name + " " + contatto.surname;
                select.appendChild(option);
            
            }
                
        }
    })
})

VisualizzaTendina.addEventListener("change", ()=>{
     apiRequest(host+"/contacts/" + select.value, "GET", {})
    .then(data => {
        console.log(data);
        getResult.style="display:block";
        document.getElementById("viewDetailName").innerHTML= data.name;
        document.getElementById("viewDetailSurname").innerHTML= data.surname;

        const list = document.createElement("ul");
        const li = document.createElement("li");
        list.appendChild(li);
        li.innerHTML = data.name;
        document.getElementById("viewDetailNumeriContainer").appendChild(list);
    })
})


FavouritedCheckbox.addEventListener("click", ()=>{
    apiRequest(host+"/contacts/"+ select.value, "PUT", {favourited: FavouritedCheckbox.checked})
    .then(data => {
        console.log(data);
    })
    .catch((error) => console.error(error));
    loadContacts();
})

UpdateContactButton.addEventListener("click", ()=>{
    apiRequest(host+"/contacts/" + select.value, "PUT", {name: NameField.value , surname: SurnameField.value})
    .then(data => {
        console.log(data);
    })
    .catch((error) => console.error(error));
    loadContacts();
})


function loadContacts(){
  apiRequest(host+"/contacts", 'GET', {})
    .then(data => {
      select.innerHTML="";
      for (const contatto of data){
        const option=document.createElement("option");
        option.value=contatto.id;
        option.innerHTML=contatto.name + " " + contatto.surname;
        select.appendChild(option);
      }
      
    })
    .catch(error => console.error(error));
}
loadContacts();

function loadContactShow(){
  apiRequest(host+"/contacts", 'GET', {})
    .then(data => {
      select.innerHTML="";
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





/*
 putListButton.addEventListener('click', ()=>{
 apiRequest(host+"/list/"+ListsTendina.value , 'PUT', { name: putListTitleField.value})
  .then(data=>{
    console.log(data);

  })
  getListButton.click();
});


//DELETE//
const deleteListButton=document.getElementById("delete-list-button");

deleteListButton.addEventListener('click', ()=>{
apiRequest(host+"/list/"+ ListsTendina.value , 'DELETE' , {})
 .then(data=>{
   console.log(data);

  })
  getListButton.click();
});





//----- CRUD ELEMENT  -----//

*/

const PostElementButton=document.getElementById("post-element-button");
const PostElementField=document.getElementById("post-element-field");
const getContactButton=document.getElementById("btnSearch");
const getResult2=document.getElementById("get-result2");


 //GET//
getContactButton.addEventListener('click', () => {
  apiRequest(host + "/contacts/" + 19, 'GET', {})
    .then(data => {
      getResult.innerHTML = "";
      console.log(data);
      if(data.length==0){
        getResult.innerHTML="NON CI SONO ELEMENTI NELLA LISTA SELEZIONATA"
      }
      const table = document.createElement("table");
      const trH = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = data.name;
      th.colSpan = 3;
      trH.appendChild(th);

      const tr1 = document.createElement("tr");
      const tdtesto = document.createElement("td");
      tdtesto.textContent = "Nome";
      tr1.appendChild(tdtesto);


      const tdstato = document.createElement("td");
      tdstato.textContent = "Stato";
      tr1.appendChild(tdstato);

      const tdcheckbox = document.createElement("td");
      tdcheckbox.textContent = "Done / To-do";
      tr1.appendChild(tdcheckbox);

      table.appendChild(trH);
      table.appendChild(tr1);
        const tr = document.createElement("tr");
        const td2 = document.createElement("td");
        td2.innerHTML = data.name;
        tr.appendChild(td2);
        const td3 = document.createElement("td");
        td3.innerHTML = data.favourited == 0 ? "TODO" : "DONE";
        tr.appendChild(td3);
        const td4 = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data.favourited == 1;
        checkbox.addEventListener("change", () => {
          let stato;
          const id=data.id;
          if (checkbox.checked) {
            stato = 1;
          }
          else { stato = 0; }
          apiRequest(host + "/contacts/" + 19, "PUT", {favourited: stato})
            .then(() => {
              console.log(data);
            })
            .catch(err => console.error(err));
        });
        td4.appendChild(checkbox);
        tr.appendChild(td4);
        table.appendChild(tr);
      getResult.appendChild(table);
    })
}
);


/*
//POST//
PostElementButton.addEventListener('click', ()=>{
apiRequest(host+"/element", 'POST', { name: PostElementField.value , listId: ListTendina.value , status:0})
  .then(data=>{
    console.log(data);

  })
  getElementButton.click();
});


//DELETE//
const DeleteElementIdField = document.getElementById("delete-element-id-field");
const DeleteElementButton = document.getElementById("delete-element-button");

DeleteElementButton.addEventListener('click', ()=> {
  apiRequest(host+"/element/"+ElementTendina.value, 'DELETE' , {})
  .then(data => {
    console.log(data)
  })
  getElementButton.click();
});

//PUT//

const PutElementTextField = document.getElementById("put-element-text-field");
const PutElementButton = document.getElementById("put-element-button");



 PutElementButton.addEventListener('click', ()=>{
 apiRequest(host+"/element/"+ElementTendina.value , 'PUT', { name: PutElementTextField.value})
  .then(data=>{
    console.log(data);

  })
  getElementButton.click();
});

// LOAD TENDINE //

function loadLists(){
  apiRequest(host+"/lists", 'GET', {})
    .then(data => {
      const select=document.getElementById("menu-tendina-lists");
      select.innerHTML="";
      for (const list of data){
        const option=document.createElement("option");
        option.value=list.id;
        option.innerHTML=list.Title;
        select.appendChild(option);
      }
      loadElements();
    })
    .catch(error => console.error(error));
}

loadLists();

function loadList(){
  apiRequest(host+"/lists", 'GET', {})
    .then(data => {
      const select=document.getElementById("menu-tendina-liste");
      select.innerHTML="";
      for (const list of data){
        const option=document.createElement("option");
        option.value=list.id;
        option.innerHTML=list.Title;
        select.appendChild(option);
      }
      loadElements();
    })
    .catch(error => console.error(error));
}

loadList();


function loadElements(){
  ListTendina.addEventListener('change', () => {
  apiRequest(host+"/elements/"+ListTendina.value , 'GET', {})
    .then(data => {
      console.log(data);
      const select=document.getElementById("menu-tendina-elementi");
      select.innerHTML="";
      for (const list of data){
        const option=document.createElement("option");
        option.value=list.id;
        option.innerHTML=list.Text;
        select.appendChild(option);
      }
    })
    .catch(error => console.error(error));
})

}


*/
