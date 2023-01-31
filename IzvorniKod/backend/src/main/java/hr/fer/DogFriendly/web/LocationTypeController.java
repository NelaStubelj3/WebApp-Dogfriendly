package hr.fer.DogFriendly.web;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.DogFriendly.model.LocationType;
import hr.fer.DogFriendly.service.LocationTypeService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class LocationTypeController {
    private LocationTypeService locationTypeService;

    @CrossOrigin(origins = "*")
    @GetMapping("/api/location-type")
    ResponseEntity<?> getAllLocationType() {
        return ResponseEntity.ok(locationTypeService.findAll());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/api/location-type/{id}")
    ResponseEntity<?> getBusinessTypeById(@PathVariable Long id) {
        Optional<LocationType> locationType = locationTypeService.findByLocationTypeId(id);
        if(locationType.isPresent()) {
            return ResponseEntity.ok(locationType);
        }

        return ResponseEntity.badRequest().body("Location type with id " + id.toString() + " does not exist");
    }
}
