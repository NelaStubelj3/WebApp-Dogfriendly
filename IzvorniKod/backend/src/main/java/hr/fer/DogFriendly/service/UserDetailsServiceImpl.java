package hr.fer.DogFriendly.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.security.UserDetailsImpl;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private AccountService accountService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account = accountService.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
        return UserDetailsImpl.build(account);
    }
    
}
