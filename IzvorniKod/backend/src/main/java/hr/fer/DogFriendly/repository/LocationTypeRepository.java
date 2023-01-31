package hr.fer.DogFriendly.repository;

import java.lang.StackWalker.Option;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import hr.fer.DogFriendly.model.LocationType;

@Repository
 public interface LocationTypeRepository extends CrudRepository<LocationType, Long> {
    Optional<LocationType> findByLocationTypeId(Long locationTypeId);
    Iterable<LocationType> findAll();
    Boolean existsByLocationTypeId(Long locationTypeId);
}
