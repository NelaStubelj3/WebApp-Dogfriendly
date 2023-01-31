package hr.fer.DogFriendly.payload.request;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SignInRequest {
    @NotBlank
	private String email;

	@NotBlank
	private String password;
}
