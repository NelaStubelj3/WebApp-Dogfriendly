package hr.fer.DogFriendly.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
public class BusinessAccountChangeRequest {

    private String businessName;
    

    @Size(min = 6, max = 30)
    private String password;

    @Size(min = 0, max = 200)
    private String bio;

    private String phoneNumber;

    
    private Long businessTypeId;
}
