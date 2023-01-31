package hr.fer.DogFriendly.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity(name = "business_account")
public class BusinessAccount {
    
    @Id
    private Long accountId;   

    private String businessName;

    private String oib;

    private String phoneNumber;

    @MapsId
    @OneToOne(targetEntity = Account.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "account_id")
    private Account account;
    
    @ManyToOne(targetEntity = BusinessType.class, fetch  = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "business_type_id")
    private BusinessType businessType;
}
