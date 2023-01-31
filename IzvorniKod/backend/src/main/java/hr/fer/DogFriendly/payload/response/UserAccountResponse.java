package hr.fer.DogFriendly.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserAccountResponse {
    private Long accountId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String bio;
}
