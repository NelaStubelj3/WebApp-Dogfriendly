package hr.fer.DogFriendly.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Size;

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
@Entity(name = "business_type")
public class BusinessType {
    @Id
    private Long businessTypeId;

    @Size(min = 0, max = 30)
    private String businessType;
}
