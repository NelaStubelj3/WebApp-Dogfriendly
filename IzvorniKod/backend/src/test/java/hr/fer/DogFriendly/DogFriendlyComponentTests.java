package hr.fer.DogFriendly;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.model.Location;
import hr.fer.DogFriendly.model.UserRole;
import hr.fer.DogFriendly.payload.request.LocationChangeRequest;
import hr.fer.DogFriendly.payload.response.LocationResponse;
import hr.fer.DogFriendly.service.AccountService;
import hr.fer.DogFriendly.service.LocationService;
import hr.fer.DogFriendly.service.LocationTypeService;
import hr.fer.DogFriendly.service.ReviewService;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class DogFriendlyComponentTests {

    WebDriver driver;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AccountService accountService;
    @Autowired
    private LocationService locationService;
    @Autowired
    private LocationTypeService locationTypeService;
    @Autowired
    private ReviewService reviewService;




    @BeforeEach
    public void init() {
        driver = new ChromeDriver();

        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\Chrome Driver\\chromedriver.exe");

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("http://dog-friendly.me/");
    }

    @Test
    @Order(1)
    public void testCreateExistingUserException() {
        Account user = new Account(71l, "lm53309@fer.hr", "Husky123",
                "Novi dućan", UserRole.BUSINESS, false, false);

        accountService.existsByEmail(user.getEmail());

        assertEquals(true, accountService.existsByEmail(user.getEmail()));
    }

    @Test
    @Order(2)
    public void testLocationChange() {
        LocationChangeRequest locationChangeRequest = new LocationChangeRequest(2l, null,
                null, "Fakultet elektrotehnike i računarstva", null, null);
        LocationResponse locationResponse = locationService.getByLocationId(locationChangeRequest.getLocationId());
        Location location = new Location(
                locationResponse.getLocationId(),
                locationResponse.getLongitude(),
                locationResponse.getLatitude(),
                locationResponse.getAddress(),
                locationChangeRequest.getLocationName() != null ? locationChangeRequest.getLocationName() : locationResponse.getLocationName(),
                locationChangeRequest.getLocationDescription() != null ? locationChangeRequest.getLocationDescription() : locationResponse.getLocationDescription(),
                locationChangeRequest.getPromoted() != null ? locationChangeRequest.getPromoted() : locationResponse.getPromoted(),
                locationChangeRequest.getDogFriendly() != null ? locationChangeRequest.getDogFriendly() : locationResponse.getDogFriendly(),
                accountService.findByAccountId(71l),
                locationTypeService.findByLocationTypeId(locationChangeRequest.getLocationTypeId() != null ? locationChangeRequest.getLocationTypeId() : locationResponse.getLocationTypeId()).orElse(null)
        );

        locationService.save(location);

        assertEquals(location, locationService.save(location));
    }

    @Test
    @Order(3)
    public void testSearchLocation() {
        String description = "808";
        List<LocationResponse> locations = locationService.search(description);
        LocationResponse location = locations.get(0);

        assertEquals("808", location.getLocationName());
    }

    @Test
    @Order(4)
    public void testReviewAverage() {
        Long locationId = 2l;
        reviewService.getAverageForLocation(locationId);
        double avrg = (double) 13/3;

        assertEquals(Double.valueOf(avrg), reviewService.getAverageForLocation(locationId));
    }

    @Test
    @Order(5)
    public void testIncorrectPassword() {
        String email = "lm53309@fer.hr";
        String password = "provala";

        Authentication authentication;
        ResponseEntity responseEntity = new ResponseEntity(HttpStatus.OK);

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
        } catch(BadCredentialsException e) {
            responseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    @Test
    @Order(6)
    public void testUnauthorizedLocationChange() {
        Long currentlyLoggedInAccountId = 71l;
        Long locationId = 196l;
        LocationResponse locationResponse = locationService.getByLocationId(locationId);
        ResponseEntity responseEntity = new ResponseEntity(HttpStatus.OK);

        if(locationResponse.getAccountId() != currentlyLoggedInAccountId)
            responseEntity = new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
    }
}
