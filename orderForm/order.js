const form = document.forms.form;
const nameInput = document.forms.form.name;
const surnameInput = document.forms.form.surname;
const dataInput = document.forms.form.date;
const streetInput = document.forms.form.street;
const houseInput = document.forms.form.house;
const flatInput = document.forms.form.flat;
//name
nameInput.onblur = function () {
  if (nameInput.value.includes(" ") || nameInput.value.length < 4) {
    nameInput.className = "error";
    errorMsg(nameInput);
  }
};
nameInput.onfocus = () => onfocusError(nameInput);
//surname
surnameInput.onblur = function () {
  if (surnameInput.value.includes(" ") || surnameInput.value.length < 5) {
    surnameInput.className = "error";
    errorMsg(surnameInput);
  }
};
surnameInput.onfocus = () => onfocusError(surnameInput);
// Date
dataInput.addEventListener("input", function () {
  let d = new Date();
  let inputDate = new Date(dataInput.value);
  if (inputDate <= d) {
    dataInput.className = "error";
    errorMsg(dataInput);
  }
});
dataInput.onfocus = () => onfocusError(dataInput);

// Street
streetInput.onblur = function () {
  if (streetInput.value.length < 5) {
    streetInput.className = "error";
    errorMsg(streetInput);
  }
};
streetInput.onfocus = () => onfocusError(streetInput);

//House
houseInput.onblur = function () {
  if (isNaN(houseInput.value) || houseInput.value <= 0) {
    houseInput.className = "error";
    errorMsg(houseInput);
  }
};
houseInput.onfocus = () => onfocusError(houseInput);

// Flat
flatInput.addEventListener("input", function (e) {
  if ((isNaN(e.data) && e.data !== "-") || flatInput.value.startsWith("-")) {
    console.log(flatInput.value);
    console.log(e.data);
    flatInput.className = "error";
    errorMsg(flatInput);
  }
});
flatInput.onfocus = () => onfocusError(flatInput);


// errors
function errorMsg(element) {
  let wrapper = element.parentElement;
  let span = wrapper.querySelector(":scope > span");
  span.style = "display: inline";
}
// onfocus
function onfocusError(element) {
  let wrapper = element.parentElement;
  let span = wrapper.querySelector(":scope > span");
  if (element.classList.contains("error")) {
    element.classList.remove("error");
    span.style = "display: none";
  }
}

// arr in forms
let giftArr = document.forms.form.gift;
giftArr.forEach((input) => (input.onclick = limitCheckb));
function limitCheckb() {
  let giftArr = document.forms.form.gift;
  let total = 0;
  for (let i = 0; i < giftArr.length; i++) {
    if (giftArr[i].checked) {
      total += 1;
    }
    if (total > 2) return false;
  }
}
//validate
let requiredArr = Array.from(document.querySelectorAll("[required]"));
let completeBtn = document.querySelector("#submit");
function validate() {
  function isComplete() {
    if (
      requiredArr.some((input) => input.value == "") ||
      requiredArr.some((input) => input.classList.contains("error"))
    ) {
      return true;
    }
    return false;
  }
  completeBtn.disabled = isComplete();
}
form.addEventListener("input", validate);
//info
completeBtn.onclick = function () {
  joinData();
};
function joinData() {
  document.querySelector(".page").innerHTML = ` <h1>The order has been created!</h1>
    <div class="summar">
      <p>${streetInput.value} street, house ${houseInput.value}, flat ${flatInput.value}.</p>
      <p>Customer ${nameInput.value} ${surnameInput.value}</p>
    </div>`;
}
