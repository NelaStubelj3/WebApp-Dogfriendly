import axios from "axios";
import { api_url } from "../App";
import authService from "./authService";

class LocationService {
    constructor(){
        this.promise = undefined
    }

    getLocation (id) {
        return axios.get(api_url + 'location/' + id).then((response) => {
            return response.data;
        })
    }
    
    getAllLocations(){
        return axios.get(api_url + 'location')
    }

    search(description) {
        this.description = description
        
        if(this.promise === undefined) {
            this.promise = new Promise(resolve => setTimeout(() => {
                this.promise = undefined
                axios.get(api_url + 'location/search?description=' + encodeURI(this.description)).then(resolve)
            }, 1000));
        }

        return this.promise
    }

    getLocationType(id) {
        return axios.get(api_url + 'location-type/' + id).then((response) => {
            return response.data;
        })
    }

    addLocation(longitude, latitude, locationName, locationDescription, promoted, dogFriendly, accountId, locationTypeId, address) {
        return axios.post(api_url + "location", {
          longitude,
          latitude,
          locationName,
          locationDescription,
          promoted,
          dogFriendly,
          accountId,
          locationTypeId,
          address
        }, {  headers: authService.authHeader(), })
      }

    
    changeLocation(locationId, locationName,  locationTypeId, dogFriendly, promoted, locationDescription) {
      return axios.put(api_url + "location", {
          locationId,  
          locationName,
          locationTypeId, 
          dogFriendly,
          promoted,
          locationDescription,
        }, {  headers: authService.authHeader(), }
      )
    }

    deleteLocation(id) {
      return axios.delete(api_url + "location/" + id, {headers: authService.authHeader()});
    }

    getLocationsForAccount(accountId) {
      return axios.get(api_url + 'location/account/' + accountId);
    }
}
  
export default new LocationService();