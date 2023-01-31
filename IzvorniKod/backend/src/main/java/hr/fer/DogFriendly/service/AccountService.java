package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class AccountService {

    private final AccountRepository accountRepository;

    public Account save(Account account) {
        return accountRepository.save(account);
    }

    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public Boolean existsByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }

    public Boolean existsByAccountId(Long accountId) {
        return accountRepository.existsByAccountId(accountId);
    }

    public Account findByAccountId(Long accountId) {
        return accountRepository.findByAccountId(accountId);
    }

    public void deleteByAccountId(Long accountId) {
        accountRepository.deleteByAccountId(accountId);
    }
}
