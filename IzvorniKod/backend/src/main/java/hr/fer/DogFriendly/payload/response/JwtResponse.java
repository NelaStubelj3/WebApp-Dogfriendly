package hr.fer.DogFriendly.payload.response;

import hr.fer.DogFriendly.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;

	private Long accountId;

	private String email;

    private UserRole userRole;

    private String type = "Bearer";
}
