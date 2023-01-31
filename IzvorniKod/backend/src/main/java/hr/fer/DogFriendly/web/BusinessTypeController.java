package hr.fer.DogFriendly.web;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.DogFriendly.model.BusinessType;
import hr.fer.DogFriendly.service.BusinessTypeService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class BusinessTypeController {
    private BusinessTypeService businessTypeService;

    @CrossOrigin(origins = "*")
    @GetMapping("/api/business-type")
    ResponseEntity<?> getAllBusinessType() {
        return ResponseEntity.ok(businessTypeService.findAll());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/api/business-type/{id}")
    ResponseEntity<?> getBusinessTypeById(@PathVariable Long id) {
        Optional<BusinessType> businessType = businessTypeService.findByBusinessTypeId(id);
        if(businessType.isPresent()) {
            return ResponseEntity.ok(businessType);
        }

        return ResponseEntity.badRequest().body("Business type with id " + id.toString() + " does not exist");
    }
}
