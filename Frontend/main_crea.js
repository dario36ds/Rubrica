const host = "http://localhost:8000/api";

const NameField = document.getElementById("name");
const SurnameField = document.getElementById("surname");
const PostContact = document.getElementById("postContact");
const FavouriteChecbox = document.getElementById("isFavorite");
const DescriptionField = document.getElementById("description");



//POST//
PostContact.addEventListener("click", () => {
  console.log(NameField.value, SurnameField.value);
  apiRequest(host + "/contacts", "POST", {
    name: NameField.value,
    surname: SurnameField.value,
    description: DescriptionField.value,
    favourited: FavouriteChecbox.checked,
  })
    .then((data) => {
      console.log(data);
      const MyID = data.id;

      for (numeri of document.getElementsByClassName("number")) {
        apiRequest(host + "/numbers", "POST", {
          contact_id: MyID,
          phone_number: numeri.value,
        })
          .then((data) => {
            console.log(data);
          })

      }

      if (document.getElementsByClassName("email").length != 0) {
        for (numeri of document.getElementsByClassName("email")) {
          apiRequest(host + "/emails", "POST", {
            contact_id: MyID,
            mail: numeri.value,
          })
            .then((data) => {
              console.log(data);
            })

        }
      }

      if (document.getElementsByClassName("address").length != 0) {
        for (numeri of document.getElementsByClassName("address")) {
          apiRequest(host + "/locations", "POST", {
            contact_id: MyID,
            address: numeri.value,
          })
            .then((data) => {
              console.log(data);
            })
        }
      }
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
  createDynamicField('address-container', 'text', 'Nuovo indirizzo', 'address');
});

