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
      MyID = data.id;

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
