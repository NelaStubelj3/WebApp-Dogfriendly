package hr.fer.DogFriendly.model;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long confirmationTokenId;

    private String confirmationToken;
    private LocalDate createdDate;

    @OneToOne(targetEntity = Account.class, fetch  = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "account_id")
    private Account account;
    
    public ConfirmationToken(Account account) {
        this.account  = account;
        this.createdDate = LocalDate.now();
        this.confirmationToken = UUID.randomUUID().toString();
    }
}
