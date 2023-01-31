package hr.fer.DogFriendly.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.BusinessType;

@Repository
public interface BusinessTypeRepository extends CrudRepository<BusinessType, Long> {
    Boolean existsByBusinessTypeId(Long businessTypeId);
    Optional<BusinessType> findByBusinessTypeId(Long businessTypeId);
    Iterable<BusinessType> findAll();
}
