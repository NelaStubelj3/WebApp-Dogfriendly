import axios from "axios";
import { api_url } from "../App";

class LocationTypeService {
  getLocationTypes() {
    return axios.get(api_url + "location-type");
  }
}

export default new LocationTypeService();
