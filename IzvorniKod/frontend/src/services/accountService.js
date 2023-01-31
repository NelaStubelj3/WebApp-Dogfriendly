import axios from "axios";
import { api_url } from "../App";
import authService from "./authService";

class AccountService {
  getAccountDetails() {
    return axios.get(api_url + "account", {
      headers: authService.authHeader(),
    });
  }

  changeUser(firstName, lastName, username, password, bio) {
    return axios
      .put(
        api_url + "account/user",
        {
          firstName,
          lastName,
          username,
          password,
          bio,
        },
        { headers: authService.authHeader() }
      )
      .then((res) => console.log(res.status));
  }

  changeBusiness(businessName, password, phoneNumber, bio, businessTypeId) {
    return axios.put(
      api_url + "account/business",
      {
        businessName,
        password,
        phoneNumber,
        bio,
        businessTypeId,
      },
      { headers: authService.authHeader() }
    );
  }

  deleteAccount() {
    return axios.delete(api_url + "account", { headers: authService.authHeader() });
  }
}

export default new AccountService();
