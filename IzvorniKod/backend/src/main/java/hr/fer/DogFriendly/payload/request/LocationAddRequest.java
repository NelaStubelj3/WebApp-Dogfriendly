package hr.fer.DogFriendly.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LocationAddRequest {
    private Double longitude;
    private Double latitude;

    private String address;
    private String locationName;
    private String locationDescription;

    private Boolean promoted;
    private Boolean dogFriendly;

    private Long locationTypeId;
}
