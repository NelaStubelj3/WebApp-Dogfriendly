import axios from "axios";
import { api_url } from "../App";

class AuthService {
  login(email, password) {
    return axios
      .post(api_url + "auth/sign-in", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        const role = response.data.userRole;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
  }

  registerUser(email, password, username, firstName, lastName, bio) {
    return axios.post(api_url + "auth/sign-up/user", {
      email,
      password,
      username,
      firstName,
      lastName,
      bio,
    });
  }

  registerBusiness(
    email,
    password,
    businessName,
    oib,
    phoneNumber,
    businessTypeId,
    bio,
    cardNumber = "1",
    validTo = "1",
    cvc = "1"
  ) {
    return axios.post(api_url + "auth/sign-up/business", {
      email,
      password,
      businessName,
      oib,
      phoneNumber,
      businessTypeId,
      bio,
      cardNumber,
      validTo,
      cvc,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  }

  confirmAccount(token) {
    return axios.get(api_url + "auth/confirm?token=" + token);
  }
}

export default new AuthService();
