export const PASSWORD_RULES = [
  { label: "Minumum 8 characters", regex: /.{8,}/g },
  { label: "Atleast one uppercase letter", regex: /[A-Z]/g },
  { label: "Atleast one lowercase letter", regex: /[a-z]/g },
  { label: "Atleast one special character", regex: /[#?!@$%^&*-]/g },
];

export const BASE_URL = "https://dummyjson.com/products";
