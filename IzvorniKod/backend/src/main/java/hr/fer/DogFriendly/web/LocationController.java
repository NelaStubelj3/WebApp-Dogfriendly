package hr.fer.DogFriendly.web;

import hr.fer.DogFriendly.model.Location;
import hr.fer.DogFriendly.payload.request.LocationAddRequest;
import hr.fer.DogFriendly.payload.request.LocationChangeRequest;
import hr.fer.DogFriendly.payload.response.LocationResponse;
import hr.fer.DogFriendly.security.UserDetailsImpl;
import hr.fer.DogFriendly.service.AccountService;
import hr.fer.DogFriendly.service.LocationService;
import hr.fer.DogFriendly.service.LocationTypeService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
public class LocationController {

    private final LocationService locationService;
    private final LocationTypeService locationTypeService;
    private final AccountService accountService;

    @CrossOrigin(origins = "*")
    @GetMapping("api/location")
    ResponseEntity<?> getLocations() {
        List<LocationResponse> locations = locationService.findAll();
        return ResponseEntity.ok(locations);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("api/location/account/{accountId}")
    ResponseEntity<?> getLocationsByAccountId(@PathVariable Long accountId) {
        List<LocationResponse> locations = locationService.findAllByAccountId(accountId);
        return ResponseEntity.ok(locations);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("api/location/{locationId}")
    ResponseEntity<?> getLocationInfo(@PathVariable Long locationId) {
        LocationResponse location = locationService.getByLocationId(locationId);
        return ResponseEntity.ok(location);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("api/location/{locationId}")
    ResponseEntity<?> deleteLocation(@PathVariable Long locationId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }
        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();

        LocationResponse locationResponse = locationService.getByLocationId(locationId);

        if(locationResponse == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Location with provided id does not exist");
        if(locationResponse.getAccountId() != userPrincipal.getAccountId())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

        locationService.deleteByLocationId(locationId);
        return ResponseEntity.ok("OK");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("api/location")
    ResponseEntity<?> changeLocation(@Valid @RequestBody LocationChangeRequest locationChangeRequest) {
        LocationResponse locationResponse = locationService.getByLocationId(locationChangeRequest.getLocationId());
        if(locationResponse == null) 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Location with provided id does not exist");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();
        if(locationResponse.getAccountId() != userPrincipal.getAccountId())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

        Location location = new Location(
            locationResponse.getLocationId(), 
            locationResponse.getLongitude(),
            locationResponse.getLatitude(),
            locationResponse.getAddress(),
            locationChangeRequest.getLocationName() != null ? locationChangeRequest.getLocationName() : locationResponse.getLocationName(),
            locationChangeRequest.getLocationDescription() != null ? locationChangeRequest.getLocationDescription() : locationResponse.getLocationDescription(),
            locationChangeRequest.getPromoted() != null ? locationChangeRequest.getPromoted() : locationResponse.getPromoted(),
            locationChangeRequest.getDogFriendly() != null ? locationChangeRequest.getDogFriendly() : locationResponse.getDogFriendly(),
            accountService.findByAccountId(userPrincipal.getAccountId()),
            locationTypeService.findByLocationTypeId(locationChangeRequest.getLocationTypeId() != null ? locationChangeRequest.getLocationTypeId() : locationResponse.getLocationTypeId()).orElse(null)
        );


        locationService.save(location);
        return ResponseEntity.ok("OK");
    }

    @CrossOrigin(origins = "*")
    @PostMapping("api/location")
    ResponseEntity<?> addLocation(@Valid @RequestBody LocationAddRequest locationAddRequest) {
        if(!locationTypeService.existsByLocationTypeId(locationAddRequest.getLocationTypeId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid location type id");
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();

        Location location = new Location();
        location.setLongitude(locationAddRequest.getLongitude());
        location.setLatitude(locationAddRequest.getLatitude());
        location.setLocationName(locationAddRequest.getLocationName());
        location.setLocationDescription(locationAddRequest.getLocationDescription());
        location.setPromoted(locationAddRequest.getPromoted());
        location.setDogFriendly(locationAddRequest.getDogFriendly());
        location.setAccount(locationService.findByAccountId(userPrincipal.getAccountId()));
        location.setLocationType(locationTypeService.findByLocationTypeId(locationAddRequest.getLocationTypeId()).orElse(null));
        location.setAddress(locationAddRequest.getAddress());

        Location newLocation = locationService.save(location);

        return ResponseEntity.ok(newLocation.getLocationId().toString());
    }

    @CrossOrigin(origins = "*")
    @GetMapping("api/location/search")
    ResponseEntity<?> search(@RequestParam("description") String description) {
        List<LocationResponse> res = locationService.search(description);
        return ResponseEntity.ok(res);
    }
}
