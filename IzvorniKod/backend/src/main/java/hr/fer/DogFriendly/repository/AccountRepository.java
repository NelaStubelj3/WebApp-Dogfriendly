package hr.fer.DogFriendly.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
    Optional<Account> findByEmail(String email);

    Boolean existsByEmail(String email);
    Boolean existsByAccountId(Long accountId);
    Account findByAccountId(Long accountId);

    void deleteByAccountId(Long accountId);
}
