package hr.fer.DogFriendly.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.Location;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {
    Location findByLocationId(Long locationId);
    List<Location> findAllByAccountAccountId(Long accountId);
    List<Location> findAll();

    void deleteByLocationId(Long locationId);

    @Query(value = "SELECT * FROM location WHERE (:description <-> location_name) < 0.6 OR (:description <-> location_description) < 0.6 LIMIT 10", nativeQuery = true)
    List<Location> search(@Param("description") String description);
}
