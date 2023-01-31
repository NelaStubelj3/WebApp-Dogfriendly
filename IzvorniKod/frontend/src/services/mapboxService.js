import axios from "axios";
import { accessToken } from '../components/home/Map'

const search_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

class MapboxService {
    constructor(){
        this.promise = undefined
        this.addressCache = {}
    }

    getSearchResults(searchString) {
        this.searchString = searchString
        
        if(this.promise === undefined) {
            this.promise = new Promise(resolve => setTimeout(() => {
                this.promise = undefined
                axios.get(encodeURI(search_url + this.searchString) + '.json?access_token=' + accessToken + '&country=hr' + '&language=hr').then(resolve)
            }, 1000));
        }
            
        return this.promise
    }

    getAddress(lng, lat) {
        lng = lng.toFixed(5)
        lat = lat.toFixed(5)
        let key = lng + ',' + lat

        if(key in this.addressCache) {
            return new Promise((resolve, reject) => {
                resolve(this.addressCache[key])
            })
        } else {
            return axios.get(encodeURI(search_url + lng + ',' + lat)  + '.json?access_token=' + accessToken + '&country=hr' + '&language=hr').then((res) => {
                this.addressCache[key] = res.data.features[0].place_name;
                return res.data.features[0].place_name;
            })
        }
    }
}

export default new MapboxService();