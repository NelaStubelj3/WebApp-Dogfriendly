package hr.fer.DogFriendly.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReviewAddRequest {
    private Long locationId;
    private Integer stars;
    private String message;
}
