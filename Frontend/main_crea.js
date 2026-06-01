const host = "http://localhost:8000/api";

const NameField = document.getElementById("name");
const SurnameField = document.getElementById("surname");
const NumberField = document.getElementById("number");
const AddNumber = document.getElementById("addNumber");
const EmailField = document.getElementById("email");
const AddEmail = document.getElementById("addEmail");
const AddressField = document.getElementById("address");
const AddAddress = document.getElementById("addAddress");
const PostContact = document.getElementById("postContact");;
const FavouriteChecbox = document.getElementById("isFavorite");



//POST//
PostContact.addEventListener("click", () => {
  console.log(NameField.value, SurnameField.value);
  apiRequest(host + "/contacts", "POST", {
    name: NameField.value,
    surname: SurnameField.value,
    favourited :FavouriteChecbox.checked,
  })
    .then((data) => {
      console.log(data);
      const MyID = data.id;

      for(numeri of document.getElementsByClassName("numbers")){

        console.log(numeri.value);
      }

      apiRequest(host + "/emails", "POST", {
        contact_id: MyID,
        mail: EmailField.value,
      })
        .then((data)=>{
        console.log(data);
      })
      apiRequest(host + "/numbers", "POST", {
        contact_id: MyID,
        phone_number: NumberField.value,
      })
        .then((data)=>{
        console.log(data);
      })
      apiRequest(host + "/locations", "POST", {
        contact_id: MyID,
        address: AddressField.value,
      })
        .then((data)=>{
        console.log(data);
      })
    })
    .catch((error) => console.error(error));
});




function createDynamicField(containerId, inputType, placeholder, className) {
  const container = document.getElementById(containerId);

  const row = document.createElement('div');
  row.className = 'dynamic-row';

  const input = document.createElement('input');
  input.type = inputType;
  input.className = `form-control ` + className;
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



document.getElementById('addNumber').addEventListener('click', () => {
  createDynamicField('number-container', 'tel', 'Nuovo numero', 'number');
});

document.getElementById('addEmail').addEventListener('click', () => {
  createDynamicField('emails-container', 'email', 'Nuova email', 'email');
});

document.getElementById('addAddress').addEventListener('click', () => {
  createDynamicField('address-container', 'text', 'Nuovo indirizzo', 'mail');
});

