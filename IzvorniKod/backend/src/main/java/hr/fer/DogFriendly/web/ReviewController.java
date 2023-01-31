package hr.fer.DogFriendly.web;

import hr.fer.DogFriendly.model.Review;
import hr.fer.DogFriendly.model.ReviewId;
import hr.fer.DogFriendly.payload.request.ReviewAddRequest;
import hr.fer.DogFriendly.payload.response.ReviewResponse;
import hr.fer.DogFriendly.security.UserDetailsImpl;
import hr.fer.DogFriendly.service.AccountService;
import hr.fer.DogFriendly.service.LocationService;
import hr.fer.DogFriendly.service.ReviewService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.validation.Valid;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final AccountService accountService;
    private final LocationService locationService;

    @CrossOrigin(origins = "*")
    @GetMapping("api/review")
    ResponseEntity<?> getLocationReviews(@RequestParam("locationId") Long locationId) {
        List<ReviewResponse> ret = new ArrayList<>();

        for(Review review : reviewService.findReviewByLocationId(locationId)) {
            ret.add(new ReviewResponse(
                review.getLocation().getLocationId(),
                review.getAccount().getAccountId(),
                review.getStars(),
                review.getMessage()));
        }
        return ResponseEntity.ok(ret);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("api/review/average")
    ResponseEntity<?> getReviewAverage(@RequestParam("locationId") Long locationId) {
        double average = reviewService.getAverageForLocation(locationId);

        return ResponseEntity.ok(average);
    }


    @CrossOrigin(origins = "*")
    @DeleteMapping("api/review")
    ResponseEntity<?> deleteReview(@RequestParam("locationId") Long locationId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();

        reviewService.delete(userPrincipal.getAccountId(), locationId);

        return ResponseEntity.ok("Ok");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("api/review")
    ResponseEntity<?> addReview(@Valid @RequestBody ReviewAddRequest reviewAddRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();

        Review review = new Review();
        review.setReviewId(new ReviewId(userPrincipal.getAccountId(), reviewAddRequest.getLocationId()));
        review.setStars(reviewAddRequest.getStars());
        review.setMessage(reviewAddRequest.getMessage());
        review.setAccount(accountService.findByAccountId(userPrincipal.getAccountId()));
        review.setLocation(locationService.findByLocationId(reviewAddRequest.getLocationId()));

        reviewService.save(review);

        return ResponseEntity.ok("Ok");
    }
}
