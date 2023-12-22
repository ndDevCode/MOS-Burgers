import { getAllProduct, getAllProductByCategory } from "./itemModel.js";
import { getNextOrderID, saveOrder } from "./placeOrderModel.js";

import {
  saveCustomer,
  getCustomerId,
  verifyCustomer,
} from "./customerLoginModel.js";

import {
  getProfileComponent,
  getCustomerDetails,
  updateCustomerDetails,
  deleteCustomerDetails,
  getRegisterComponent,
} from "./customerProfileModel.js";

// Entrance Animation handler

const animateitems = Array.from(document.querySelectorAll(".animate-div"));
const btnOrderNow = document.getElementById("btn-order-now");
const placeOrderView = document.getElementById("place-order-view");

function addAnimations(element) {
  setTimeout(() => {
    element.classList.add("animate__animated");
  }, 500);
}

function removeElement(element) {
  setTimeout(() => {
    element.classList.add("d-none");
  }, 3000);
}

btnOrderNow.addEventListener("click", () => {
  btnOrderNow.classList.add("animate__animated");
  animateitems.forEach(addAnimations);
  animateitems.forEach(removeElement);
  document.body.style.overflow = "hidden";
  placeOrderView.classList.remove("d-none");
  loadItemCards();
});

window.onload = () => {
  sessionStorage.setItem("loggedUser", "");
};

// Loading products list

const itemContainer = document.getElementById("item-card-container");
const itemList = getAllProduct();

function loadItemCards() {
  itemList.forEach((item) => itemContainer.appendChild(item));
}

// Item Searching Function

const searchInput = document.getElementById("txt-item-search");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredItems = itemList.filter((item) =>
    item.textContent.toLowerCase().includes(searchTerm)
  );

  itemContainer.innerHTML = "";
  filteredItems.forEach((item) => itemContainer.appendChild(item));
});

// Filter item by category name selection

const burger_category = document.getElementById("burger-category");
const submarine_category = document.getElementById("submarine-category");
const pasta_category = document.getElementById("pasta-category");
const fries_category = document.getElementById("fries-category");
const chicken_category = document.getElementById("chicken-category");
const beverage_category = document.getElementById("beverage-category");

burger_category.addEventListener("click", () => {
  filterItemsByCategory(burger_category.innerText);
});

submarine_category.addEventListener("click", () => {
  filterItemsByCategory(submarine_category.innerText);
});

pasta_category.addEventListener("click", () => {
  filterItemsByCategory(pasta_category.innerText);
});

fries_category.addEventListener("click", () => {
  filterItemsByCategory(fries_category.innerText);
});

chicken_category.addEventListener("click", () => {
  filterItemsByCategory(chicken_category.innerText);
});

beverage_category.addEventListener("click", () => {
  filterItemsByCategory(beverage_category.innerText);
});

function filterItemsByCategory(searchTerm) {
  const itemListByCategory = getAllProductByCategory(searchTerm);
  itemContainer.innerHTML = "";
  itemListByCategory.forEach((item) => itemContainer.appendChild(item));
}

// Function of applying Coupon code

document.getElementById("btn-add-coupon").addEventListener("click", () => {
  addCouponCode();
});

function addCouponCode() {
  const couponCode = document.getElementById("txt-coupon-code");
  if (couponCode.value.length === 0) {
    alert("Please enter a valid coupon code");
  } else {
    if (couponCode.value === "mosburger") {
      const billSubtotal = document.getElementById("bill-subtotal");
      const billDiscount = document.getElementById("bill-discount");
      const billTotal = document.getElementById("bill-total");

      let couponDiscount =
        Number.parseInt(billDiscount.innerText) +
        Number.parseInt(billSubtotal.innerText) * 0.1;
      billDiscount.innerText = couponDiscount;
      billTotal.innerText =
        Number.parseInt(billSubtotal.innerText) - couponDiscount;

      couponCode.disabled = true;
      document.getElementById("btn-add-coupon").disabled = true;
      alert("Coupon code applied");
      return;
    }
    alert("Coupon code invalid");
  }
}

// Register Customer Function

document.getElementById("btn-register-form").addEventListener("click", () => {
  registerCustomer();
});

document.getElementById("btn-clear-form").addEventListener("click", () => {
  clearRegistrationForm();
});

function registerCustomer() {
  const customerName = document.getElementById("txt-customer-name").value;
  const customerContact = document.getElementById("txt-customer-contact").value;
  const customerEmail = document.getElementById("txt-customer-email").value;
  const customerAddress = document.getElementById("txt-customer-address").value;
  const customerBirthday = document.getElementById(
    "txt-customer-birthday"
  ).value;
  const customerPassword = document.getElementById(
    "txt-customer-password"
  ).value;

  if (
    customerName.length === 0 ||
    customerContact.length === 0 ||
    customerEmail.length === 0 ||
    customerAddress.length === 0 ||
    customerBirthday.length === 0 ||
    customerPassword.length === 0
  ) {
    alert("Please fill all the fields");
  } else {
    const customerId = getCustomerId();
    const customer = {
      customerId: customerId,
      name: customerName,
      contact: customerContact,
      email: customerEmail,
      address: customerAddress,
      birthday: customerBirthday,
      password: customerPassword,
    };

    if (saveCustomer(customer)) {
      alert("Congrats! You have successfully registered");
      clearRegistrationForm();

      const customerLoginData = {
        email: customer.email,
        password: customer.password,
      };

      changeStoreState(customerLoginData);
      loadCustomerProfileData(customerLoginData);
      document.getElementById("btn-close-register").click();
      return;
    }

    alert("Sorry, Registration failed");
  }
}

function clearRegistrationForm() {
  const customerName = (document.getElementById("txt-customer-name").value =
    "");
  const customerContact = (document.getElementById(
    "txt-customer-contact"
  ).value = "");
  const customerEmail = (document.getElementById("txt-customer-email").value =
    "");
  const customerAddress = (document.getElementById(
    "txt-customer-address"
  ).value = "");
  const customerBirthday = (document.getElementById(
    "txt-customer-birthday"
  ).value = "");
  const customerPassword = (document.getElementById(
    "txt-customer-password"
  ).value = "");
}

// Login Customer

document.getElementById("btn-login-form").addEventListener("click", () => {
  loginCustomer();
});

document.getElementById("btn-clear-login").addEventListener("click", () => {
  clearLoginForm();
});

function loginCustomer() {
  const customerEmail = document.getElementById("txt-login-email").value;
  const customerPassword = document.getElementById("txt-login-password").value;

  const customerLoginData = {
    email: customerEmail,
    password: customerPassword,
  };

  if (verifyCustomer(customerLoginData)) {
    alert("Customer login successful!");
    changeStoreState(customerLoginData);
    loadCustomerProfileData(customerLoginData);
    document.getElementById("btn-loginmodal-close").click();
    return;
  }

  alert("Customer login failed!");
}

function clearLoginForm() {
  const customerEmail = (document.getElementById("txt-login-email").value = "");
  const customerPassword = (document.getElementById(
    "txt-login-password"
  ).value = "");
}

// Change the store state registered customer/ logged customer

function changeStoreState(customerLoginData) {
  document.getElementById("navbarToggler").innerHTML = "";
  document
    .getElementById("navbarToggler")
    .appendChild(getProfileComponent(customerLoginData));
}

// load customer profile data

function loadCustomerProfileData(customerLoginData) {
  const customerName = document.getElementById("txt-profile-name");
  const customerEmail = document.getElementById("txt-profile-email");
  const customerPassword = document.getElementById("txt-profile-password");
  const customerContact = document.getElementById("txt-profile-contact");
  const customerAddress = document.getElementById("txt-profile-address");
  const customerBirthday = document.getElementById("txt-profile-birthday");

  const customer = getCustomerDetails(customerLoginData);
  customerName.value = customer.name;
  customerEmail.value = customer.email;
  customerPassword.value = customer.password;
  customerContact.value = customer.contact;
  customerAddress.value = customer.address;
  customerBirthday.value = customer.birthday;
}

// Update customer details
const btnUpdate = document.getElementById("btn-profile-update");
btnUpdate.addEventListener("click", () => {
  updateCustomer();
});

function updateCustomer() {
  const customerName = document.getElementById("txt-profile-name").value;
  const customerEmail = document.getElementById("txt-profile-email").value;
  const customerPassword = document.getElementById(
    "txt-profile-password"
  ).value;
  const customerContact = document.getElementById("txt-profile-contact").value;
  const customerAddress = document.getElementById("txt-profile-address").value;
  const customerBirthday = document.getElementById(
    "txt-profile-birthday"
  ).value;

  const customerLoginData = {
    email: customerEmail,
    password: customerPassword,
  };

  const customerId = getCustomerDetails(customerLoginData).customerId;

  const customer = {
    customerId: customerId,
    name: customerName,
    contact: customerContact,
    email: customerEmail,
    address: customerAddress,
    birthday: customerBirthday,
    password: customerPassword,
  };

  if (updateCustomerDetails(customer)) {
    alert("Customer updated successfully");
    return;
  }

  alert("Error updating customer");
}

// Delete customer
const btnDelete = document.getElementById("btn-profile-delete");
btnDelete.addEventListener("click", () => {
  deleteCustomer();
});

function deleteCustomer() {
  const customerEmail = document.getElementById("txt-profile-email").value;
  const customerPassword = document.getElementById(
    "txt-profile-password"
  ).value;

  if (deleteCustomerDetails(customerEmail, customerPassword)) {
    alert("Customer deleted successfully");
    changeStatusToUnregistered();
    location.reload();
    return;
  }

  alert("Error deleting customer");
}

// change state to unregistered
function changeStatusToUnregistered() {
  document.getElementById("navbarToggler").innerHTML = "";
  document.getElementById("navbarToggler").appendChild(getRegisterComponent());
  document.getElementById("btn-profile-close").click();
}

// Place Order function

const btnPlaceOrder = document.getElementById("btn-place-order");
btnPlaceOrder.addEventListener("click", () => {
  placeOrder();
});

function placeOrder() {
  const orderItemsQty = parseInt(sessionStorage.getItem("orderItemIndex"));
  let customer = null;

  try {
    customer = JSON.parse(sessionStorage.getItem("loggedUser"));
  } catch (error) {}

  if (customer === undefined || customer === null) {
    alert("Please Register or Login to order");
    return;
  } else if (orderItemsQty <= 0) {
    alert("Please add items to order");
    return;
  }

  if (orderItemsQty > 0 && customer != null) {
    const orderItems = new Map(
      JSON.parse(sessionStorage.getItem("orderItems"))
    );

    const newOrderId = getNextOrderID();

    const orderTotal = parseFloat(
      document.getElementById("bill-total").innerText
    );
    const orderDiscount = parseFloat(
      document.getElementById("bill-discount").innerText
    );

    // orderItems.forEach((item) => {
    //   console.log(item);
    // });

    //Need to create a function to extract data from the orderItems

    const order = {
      orderId: newOrderId,
      customerDetails: customer,
      timestamp: new Date().toLocaleString(),
      itemList: orderItems,
      total: orderTotal,
      discount: orderDiscount,
    };

    if (saveOrder(newOrderId, order)) {
      alert("Order placed successfully!");
    }
  }
}
