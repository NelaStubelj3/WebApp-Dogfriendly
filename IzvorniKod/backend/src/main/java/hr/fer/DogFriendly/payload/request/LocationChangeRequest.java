package hr.fer.DogFriendly.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationChangeRequest {
    private Long locationId;
    private Long locationTypeId;
    private String locationName;
    private String locationDescription;
    private Boolean promoted;
    private Boolean dogFriendly;
}
