const admin = new Map([
  [
    "A001",
    {
      productId: "A001",
      name: "Siril Fernando",
      contact: "0771234567",
      email: "siril@gmail.com",
      password: "6666",
    },
  ],
  [
    "A002",
    {
      productId: "A002",
      name: "Manoj Fernando",
      contact: "07812345678",
      email: "manoj@gmail.com",
      password: "5555",
    },
  ],
]);

function loadAdminToStorage() {
  sessionStorage.setItem("admin", JSON.stringify(Array.from(admin.entries())));
}

export default loadAdminToStorage;
