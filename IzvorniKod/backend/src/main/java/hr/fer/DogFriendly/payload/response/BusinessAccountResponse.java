package hr.fer.DogFriendly.payload.response;

import hr.fer.DogFriendly.model.BusinessType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BusinessAccountResponse {
    private Long accountId;
    private String email;
    private String bio;
    private String businessName;
    private String oib;
    private String phoneNumber;
    private Long businessTypeId;
}
