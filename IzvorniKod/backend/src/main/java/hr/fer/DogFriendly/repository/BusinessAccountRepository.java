package hr.fer.DogFriendly.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.BusinessAccount;

@Repository
public interface BusinessAccountRepository extends CrudRepository<BusinessAccount, Long> {
    public BusinessAccount findByAccountId(Long accountId);
    void deleteByAccountId(Long accountId);
}
