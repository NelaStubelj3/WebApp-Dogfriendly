package hr.fer.DogFriendly.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private Long locationId;
    private Long accountId;
    

    private Integer stars;
    private String message;
}
