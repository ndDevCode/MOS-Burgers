import loadCustomersToStorage from "./customerData.js";

loadCustomersToStorage();

export function saveCustomer(customer) {
  const customers = new Map(JSON.parse(sessionStorage.getItem("customers")));
  customers.set(customer.customerId, customer);

  console.log(customers);

  sessionStorage.setItem(
    "customers",
    JSON.stringify(Array.from(customers.entries()))
  );

  return true;
}

export function getCustomerId() {
  const customers = new Map(JSON.parse(sessionStorage.getItem("customers")));
  const lastCustomerId = Array.from(customers.keys()).pop();

  let lastCustomerNumber = parseInt(lastCustomerId.split("C")[1]);
  lastCustomerNumber++;
  const nextCustomerNumber = String(lastCustomerNumber).padStart(4, "0");

  const nextCustomerId = `C${nextCustomerNumber}`;

  return nextCustomerId;
}

export function verifyCustomer(customerLoginData) {
  const customers = new Map(JSON.parse(sessionStorage.getItem("customers")));

  for (const customer of customers.values()) {
    if (
      customer.email === customerLoginData.email &&
      customer.password === customerLoginData.password
    ) {
      return true;
    }
  }
}
