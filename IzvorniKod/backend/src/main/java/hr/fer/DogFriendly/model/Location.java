package hr.fer.DogFriendly.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "location")
public class Location {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    private Double longitude;
    private Double latitude;

    private String address;
    private String locationName;
    private String locationDescription;

    private Boolean promoted;
    private Boolean dogFriendly;

    @ManyToOne(targetEntity = Account.class, fetch  = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "account_id")
    private Account account;

    @ManyToOne(targetEntity = LocationType.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "location_type_id")
    private LocationType locationType;
}
