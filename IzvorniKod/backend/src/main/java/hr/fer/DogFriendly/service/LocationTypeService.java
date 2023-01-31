package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.LocationType;
import hr.fer.DogFriendly.repository.LocationTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class LocationTypeService {

    private final LocationTypeRepository locationTypeRepository;

    public Boolean existsByLocationTypeId(Long locationTypeId) {
        return locationTypeRepository.existsByLocationTypeId(locationTypeId);
    }

    public Optional<LocationType> findByLocationTypeId(Long locationTypeId) {
        return locationTypeRepository.findByLocationTypeId(locationTypeId);
    }

    public Iterable<LocationType> findAll() {
        return locationTypeRepository.findAll();
    }
}
