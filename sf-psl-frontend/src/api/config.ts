export const API_USER = "superadmin";
export const API_PASSWORD = "password";
export const API_HOST = "http://localhost:8001/api";

export const getDefaultHeaders = () => {
  return {
    accept: "application/json",
    "X-AUTH-USER": API_USER,
    "X-AUTH-TOKEN": API_PASSWORD,
  };
};
