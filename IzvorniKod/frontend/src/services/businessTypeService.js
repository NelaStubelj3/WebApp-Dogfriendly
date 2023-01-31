import axios from "axios";
import { api_url } from "../App";

class BusinessTypeService {
    getAllBusinessType () {
        return axios.get(api_url + 'business-type').then((response) => {
            return response.data;
        })
    }

    getBusinessType(businessTypeId) {
        return axios.get(api_url + 'business-type/' + businessTypeId).then((response) => {
            return response.data;
        })
    }
    
}
  
export default new BusinessTypeService();