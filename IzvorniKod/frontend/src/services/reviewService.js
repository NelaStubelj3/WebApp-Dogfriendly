import axios from "axios";
import { api_url } from "../App";
import authService from "./authService";

class ReviewService {
    getReviews(locationId) {
        return axios.get(api_url + 'review?locationId=' + encodeURI(locationId))
    }

    deleteReview(locationId) {
        return axios.delete(api_url + 'review?locationId=' + encodeURI(locationId), { headers: authService.authHeader() })
    }

    postReview(locationId, stars, message) {
        return axios.post(api_url + "review", {
            locationId,
            stars,
            message
        }, { headers: authService.authHeader() });
    }
}
  
export default new ReviewService();