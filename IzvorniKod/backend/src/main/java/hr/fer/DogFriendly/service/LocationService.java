package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.model.Location;
import hr.fer.DogFriendly.payload.response.LocationResponse;
import hr.fer.DogFriendly.repository.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class LocationService {

    private final LocationRepository locationRepository;
    private final AccountService accountService;
    private final ReviewService reviewService;

    public LocationResponse getByLocationId(Long locationId) {
        Location location = locationRepository.findByLocationId(locationId);
        if (location == null) {
            return null;
        }

        return new LocationResponse(
                location.getLocationId(),
                location.getLongitude(),
                location.getLatitude(),
                location.getAddress(),
                location.getLocationName(),
                location.getLocationDescription(),
                location.getPromoted(),
                location.getDogFriendly(),
                location.getAccount().getAccountId(),
                location.getLocationType().getLocationTypeId(),
                reviewService.getAverageForLocation(locationId)
        );
    }

    public Location save(Location location) {
        return locationRepository.save(location);
    }

    public Location findByLocationId(Long locationId) {
        return locationRepository.findByLocationId(locationId);
    }

    public void deleteByLocationId(Long locationId) {
        locationRepository.deleteByLocationId(locationId);
    }

    public List<LocationResponse> findAllByAccountId(Long accountId) {
        List<Location> locations = locationRepository.findAllByAccountAccountId(accountId);
        List<LocationResponse> locationsResponse = new ArrayList<>();
        for (Location location: locations) {
            locationsResponse.add(new LocationResponse(
                    location.getLocationId(),
                    location.getLongitude(),
                    location.getLatitude(),
                    location.getAddress(),
                    location.getLocationName(),
                    location.getLocationDescription(),
                    location.getPromoted(),
                    location.getDogFriendly(),
                    location.getAccount().getAccountId(),
                    location.getLocationType().getLocationTypeId(),
                    reviewService.getAverageForLocation(location.getLocationId())
            ));
        }
        return locationsResponse;
    }

    public List<LocationResponse> findAll() {
        List<Location> locations = locationRepository.findAll();
        List<LocationResponse> locationsResponse = new ArrayList<>();
        for (Location location: locations) {
            locationsResponse.add(new LocationResponse(
                    location.getLocationId(),
                    location.getLongitude(),
                    location.getLatitude(),
                    location.getAddress(),
                    location.getLocationName(),
                    location.getLocationDescription(),
                    location.getPromoted(),
                    location.getDogFriendly(),
                    location.getAccount().getAccountId(),
                    location.getLocationType().getLocationTypeId(),
                    0.0
            ));
        }
        return locationsResponse;
    }

    public List<LocationResponse> search(String description) {
        List<Location> locations = locationRepository.search(description);
        List<LocationResponse> locationsResponse = new ArrayList<>();
        for (Location location: locations) {
            locationsResponse.add(new LocationResponse(
                    location.getLocationId(),
                    location.getLongitude(),
                    location.getLatitude(),
                    location.getAddress(),
                    location.getLocationName(),
                    location.getLocationDescription(),
                    location.getPromoted(),
                    location.getDogFriendly(),
                    location.getAccount().getAccountId(),
                    location.getLocationType().getLocationTypeId(),
                    0.0
            ));
        }
        return locationsResponse;
    }

    public Account findByAccountId(Long accountId) {
        return accountService.findByAccountId(accountId);
    }
}
