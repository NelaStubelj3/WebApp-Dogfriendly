package hr.fer.DogFriendly.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.Review;
import hr.fer.DogFriendly.model.ReviewId;

@Repository
public interface ReviewRepository extends CrudRepository<Review, ReviewId> {
    Optional<Review> findByReviewId(ReviewId reviewId);

    List<Review> findAllByReviewId_LocationId(Long locationId);

    @Query(value = "SELECT AVG(stars) FROM review WHERE location_id = :locationId", nativeQuery = true)
    Double getAverageForLocation(@Param("locationId") Long locationId);
}
