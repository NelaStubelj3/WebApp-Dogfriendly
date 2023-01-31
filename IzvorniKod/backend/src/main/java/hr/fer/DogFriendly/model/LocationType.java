package hr.fer.DogFriendly.model;

import javax.persistence.Entity;
import javax.persistence.Id;

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
@Entity(name = "location_type")
@AllArgsConstructor
@NoArgsConstructor
public class LocationType {
    
    @Id
    private Long locationTypeId;

    private String locationType;
}
