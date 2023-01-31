package hr.fer.DogFriendly.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

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
@Entity(name = "review")
public class Review {
    @EmbeddedId
    private ReviewId reviewId;

    private Integer stars;
    private String message;

    @MapsId("accountId")
    @ManyToOne(targetEntity = Account.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "accountId")
    private Account account;

    @MapsId("locationId")
    @ManyToOne(targetEntity = Location.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "locationId")
    private Location location;
}
