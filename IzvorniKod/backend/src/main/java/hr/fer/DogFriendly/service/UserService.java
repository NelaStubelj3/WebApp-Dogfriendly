package hr.fer.DogFriendly.service;

import java.text.MessageFormat;
import java.util.Optional;

import javax.validation.Valid;

import hr.fer.DogFriendly.model.*;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService{

    private final AccountService accountService;
    private final UserAccountService userAccountService;
    private final BusinessAccountService businessAccountService;
    private final BusinessTypeService businessTypeService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final ConfirmationTokenService confirmationTokenService;

    private final EmailService emailService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final Optional<Account> optionalUser = accountService.findByEmail(email);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new UsernameNotFoundException(MessageFormat.format("User with email {0} cannot be found.", email));
        }
    }

    private void signUpAccount(Account account) {
        final String encryptedPassword = bCryptPasswordEncoder.encode(account.getPassword());

        account.setPassword(encryptedPassword);

        final Account createdUser = accountService.save(account);

        final ConfirmationToken confirmationToken = new ConfirmationToken(account);
        confirmationTokenService.saveConfirmationToken(confirmationToken);

        sendConfirmationEmail(account.getEmail(), confirmationToken.getConfirmationToken());
    }

    public void signUpUser(UserAccount user) {
        signUpAccount(user.getAccount());

        final UserAccount userAccount = userAccountService.save(user);
    }

    public void signUpBusiness(@Valid BusinessAccount business) {
        signUpAccount(business.getAccount());

        final BusinessAccount businessAccount = businessAccountService.save(business);
    }

    public void confirmAccount(ConfirmationToken confirmationToken) {
        final Account user = confirmationToken.getAccount();
        
        user.setEnabled(true);
        accountService.save(user);

        confirmationTokenService.deleteConfirmationToken(confirmationToken.getConfirmationTokenId());
    }

    public void sendConfirmationEmail(String userMail, String token) {
        final SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userMail);
        mailMessage.setSubject("Mail Confirmation Link!");
        mailMessage.setFrom("<MAIL>");
        mailMessage.setText(
                "Thank you for registering. Please click on the below link to activate your account." + " http://dog-friendly.me/confirm?token="
                        + token);

        emailService.sendMail(mailMessage);
    }

    public Boolean existsByBusinessTypeId(Long businessTypeId) {
        return businessTypeService.existsByBusinessTypeId(businessTypeId);
    }
    public Optional<BusinessType> findByBusinessTypeId(Long businessTypeId) {
        return businessTypeService.findByBusinessTypeId(businessTypeId);
    }
    public Boolean existsByEmail(String email) {
        return accountService.existsByEmail(email);
    }
    public Boolean existsByAccountId(Long accountId) {
        return accountService.existsByAccountId(accountId);
    }
}
