package hr.fer.DogFriendly.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.ConfirmationToken;

@Repository
public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, Long> {
    Optional<ConfirmationToken> findConfirmationTokenByConfirmationToken(String token);
}
