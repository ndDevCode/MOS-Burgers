export function getRegisterComponent() {
  return createRegisterComponent();
}

export function getProfileComponent(customerLoginData) {
  const customers = new Map(JSON.parse(sessionStorage.getItem("customers")));

  for (const customer of customers.values()) {
    if (
      customer.email === customerLoginData.email &&
      customer.password === customerLoginData.password
    ) {
      return createProfileComponent(customer.name);
    }
  }
}

export function getCustomerDetails(customerLoginData) {
  const customers = new Map(JSON.parse(sessionStorage.getItem("customers")));

  for (const customer of customers.values()) {
    if (
      customer.email === customerLoginData.email &&
      customer.password === customerLoginData.password
    ) {
      return customer;
    }
  }
}

export function updateCustomerDetails(customer) {
  try {
    const customers = new Map(JSON.parse(sessionStorage.getItem("customers")));
    customers.set(customer.customerId, customer);
    sessionStorage.setItem(
      "customers",
      JSON.stringify(Array.from(customers.entries()))
    );
    return true;
  } catch {
    return false;
  }
}

export function deleteCustomerDetails(email, password) {
  const customers = new Map(JSON.parse(sessionStorage.getItem("customers")));

  for (const customer of customers.values()) {
    if (customer.email === email && customer.password === password) {
      customers.delete(customer.customerId);
      sessionStorage.setItem(
        "customers",
        JSON.stringify(Array.from(customers.entries()))
      );
      return true;
    }
  }

  return false;
}

function createProfileComponent(name) {
  const container = document.createElement("div");
  container.classList.add(
    "d-flex",
    "justify-content-end",
    "align-items-center",
    "rounded-3",
    "p-1",
    "me-3"
  );

  const textDiv = document.createElement("div");

  const welcomeParagraph = document.createElement("p");
  welcomeParagraph.classList.add("m-0", "txt-welcome");
  welcomeParagraph.textContent = `Welcome ${name}`;

  const dateTimeParagraph = document.createElement("p");
  dateTimeParagraph.classList.add("m-0", "txt-date-time");
  dateTimeParagraph.textContent = `${new Date().toLocaleString()}`;

  textDiv.appendChild(welcomeParagraph);
  textDiv.appendChild(dateTimeParagraph);

  const imageDiv = document.createElement("div");

  const registerButton = document.createElement("button");
  registerButton.style.backgroundImage =
    "url(./assets/icons/profile-login.svg)";
  registerButton.classList.add(
    "btn",
    "btn-dark",
    "bg-transparent",
    "border-0",
    "profile-btn-bg"
  );
  registerButton.setAttribute("data-bs-target", "#customer-profile-model");
  registerButton.setAttribute("data-bs-toggle", "modal");

  imageDiv.appendChild(registerButton);

  container.appendChild(textDiv);
  container.appendChild(imageDiv);

  return container;
}

function createRegisterComponent() {
  const navbar = document.createElement("ul");
  navbar.className =
    "navbar-nav me-auto mb-2 mb-lg-0 w-50 d-flex justify-content-end";

  const registerItem = document.createElement("li");
  registerItem.className = "nav-item d-flex justify-content-end";

  const registerButton = document.createElement("button");
  registerButton.className = "btn btn-dark bg-transparent border-0";
  registerButton.setAttribute("data-bs-target", "#registerModel");
  registerButton.setAttribute("data-bs-toggle", "modal");

  const registerLink = document.createElement("p");
  registerLink.className = "nav-link navbar-item mb-0";
  registerLink.textContent = "Register";

  registerButton.appendChild(registerLink);
  registerItem.appendChild(registerButton);

  const loginItem = document.createElement("li");
  loginItem.className = "nav-item d-flex justify-content-end";

  const loginButton = document.createElement("button");
  loginButton.className = "btn btn-dark bg-transparent border-0";
  loginButton.setAttribute("data-bs-target", "#loginModel");
  loginButton.setAttribute("data-bs-toggle", "modal");

  const loginLink = document.createElement("p");
  loginLink.className = "nav-link navbar-item mb-0";
  loginLink.textContent = "Login";

  loginButton.appendChild(loginLink);
  loginItem.appendChild(loginButton);

  navbar.appendChild(registerItem);
  navbar.appendChild(loginItem);

  return navbar;
}
