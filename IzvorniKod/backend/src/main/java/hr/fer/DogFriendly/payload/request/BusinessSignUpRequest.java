package hr.fer.DogFriendly.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class BusinessSignUpRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 30)
    private String password;

    @Size(min = 0, max = 200)
    private String bio;

    @NotBlank
    private String businessName;

    @NotBlank
    @Size(min = 11, max = 11) 
    private String oib;

    @NotBlank 
    private String phoneNumber;

    private Long businessTypeId;

    @NotBlank
    private String cardNumber;

    @NotBlank
    private String validTo;

    @NotBlank
    private String cvc;
}
