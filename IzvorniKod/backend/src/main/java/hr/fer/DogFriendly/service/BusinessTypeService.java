package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.BusinessType;
import hr.fer.DogFriendly.repository.BusinessTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class BusinessTypeService {
    private final BusinessTypeRepository businessTypeRepository;

    public Boolean existsByBusinessTypeId(Long businessTypeId) {
        return businessTypeRepository.existsByBusinessTypeId(businessTypeId);
    }

    public Optional<BusinessType> findByBusinessTypeId(Long businessTypeId) {
        return businessTypeRepository.findByBusinessTypeId(businessTypeId);
    }

    public Iterable<BusinessType> findAll() {
        return businessTypeRepository.findAll();
    }
}
