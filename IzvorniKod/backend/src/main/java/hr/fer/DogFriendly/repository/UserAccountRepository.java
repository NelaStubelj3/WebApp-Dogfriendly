package hr.fer.DogFriendly.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.UserAccount;

@Repository
public interface UserAccountRepository extends CrudRepository<UserAccount, Long> {
    UserAccount findByAccountId(Long accountId);
    void deleteByAccountId(Long accountId);
}
