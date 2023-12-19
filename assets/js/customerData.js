const customers = new Map([
  [
    "C001",
    {
      customerId: "C001",
      name: "Naveen Fernando",
      contact: "0771234567",
      email: "naveen@gmail.com",
      address: "NO 37, Eluwila, Panadura",
      birthday: "1998-04-05",
      password: "1234",
    },
  ],
  [
    "C002",
    {
      customerId: "C002",
      name: "Nadeesha Dassanayake",
      contact: "07812345678",
      email: "nadeesha@gmail.com",
      address: "NO 151, Galle road, Panadura",
      birthday: "1998-12-05",
      password: "4321",
    },
  ],
]);

function loadCustomersToStorage() {
  sessionStorage.setItem(
    "customers",
    JSON.stringify(Array.from(customers.entries()))
  );
}

export default loadCustomersToStorage;
