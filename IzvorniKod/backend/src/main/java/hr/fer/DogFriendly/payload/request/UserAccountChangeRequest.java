package hr.fer.DogFriendly.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserAccountChangeRequest {

    private String username;
    private String password;

    private String firstName;

    private String lastName;
    private String bio;
}
