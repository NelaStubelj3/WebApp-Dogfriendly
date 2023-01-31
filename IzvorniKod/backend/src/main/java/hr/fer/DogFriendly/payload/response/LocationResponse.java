package hr.fer.DogFriendly.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationResponse {
    private Long locationId;

    private Double longitude;
    private Double latitude;

    private String address;
    private String locationName;
    private String locationDescription;

    private Boolean promoted;
    private Boolean dogFriendly;

    private Long accountId;
    private Long locationTypeId;

    private Double starAverage;
}
