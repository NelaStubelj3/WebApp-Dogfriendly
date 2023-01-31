package hr.fer.DogFriendly.web;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.model.BusinessAccount;
import hr.fer.DogFriendly.model.UserAccount;
import hr.fer.DogFriendly.model.UserRole;
import hr.fer.DogFriendly.payload.request.BusinessAccountChangeRequest;
import hr.fer.DogFriendly.payload.request.UserAccountChangeRequest;
import hr.fer.DogFriendly.payload.response.BusinessAccountResponse;
import hr.fer.DogFriendly.payload.response.UserAccountResponse;
import hr.fer.DogFriendly.security.UserDetailsImpl;
import hr.fer.DogFriendly.service.AccountService;
import hr.fer.DogFriendly.service.BusinessAccountService;
import hr.fer.DogFriendly.service.BusinessTypeService;
import hr.fer.DogFriendly.service.UserAccountService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final BusinessAccountService businessAccountService;
    private final UserAccountService userAccountService;
    private final BusinessTypeService businessTypeService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @CrossOrigin(origins = "*")
    @GetMapping("api/account")
    ResponseEntity<?> getAccountInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();
        Long accountId = userPrincipal.getAccountId();
        UserRole userRole = userPrincipal.getUserRole();
        Account account = accountService.findByAccountId(accountId);

        if (userRole == UserRole.USER) {
            UserAccount userAccount = userAccountService.findByAccountId(accountId);
            UserAccountResponse accountResponse = new UserAccountResponse(
                    account.getAccountId(),
                    userAccount.getUsername(),
                    account.getEmail(),
                    userAccount.getFirstName(),
                    userAccount.getLastName(),
                    account.getBio());
            return ResponseEntity.ok(accountResponse);
        } else {
            BusinessAccount businessAccount = businessAccountService.findByAccountId(accountId);
            BusinessAccountResponse accountResponse = new BusinessAccountResponse(
                    account.getAccountId(),
                    account.getEmail(),
                    account.getBio(),
                    businessAccount.getBusinessName(),
                    businessAccount.getOib(),
                    businessAccount.getPhoneNumber(),
                    businessAccount.getBusinessType().getBusinessTypeId());
            return ResponseEntity.ok(accountResponse);
        }
    }

    @CrossOrigin(origins = "*")
    @PutMapping("api/account/user")
    ResponseEntity<?> changeUserAccountInfo(@Valid @RequestBody UserAccountChangeRequest userAccountChangeRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();
        Long accountId = userPrincipal.getAccountId();
        Account account = accountService.findByAccountId(accountId);
        UserAccount userAccount = userAccountService.findByAccountId(accountId);

        if (userAccountChangeRequest.getUsername() != null) {
            userAccount.setUsername(userAccountChangeRequest.getUsername());
        }
        if (userAccountChangeRequest.getPassword() != null) {
            final String encryptedPassword = bCryptPasswordEncoder.encode(userAccountChangeRequest.getPassword());
            account.setPassword(encryptedPassword);
        }
        if (userAccountChangeRequest.getFirstName() != null) {
            userAccount.setFirstName(userAccountChangeRequest.getFirstName());
        }
        if (userAccountChangeRequest.getLastName() != null) {
            userAccount.setLastName(userAccountChangeRequest.getLastName());
        }
        if (userAccountChangeRequest.getBio() != null) {
            account.setBio(userAccountChangeRequest.getBio());
        }

        accountService.save(account);
        userAccountService.save(userAccount);

        return ResponseEntity.ok("Account saved");
    }

    @CrossOrigin(origins = "*")
    @PutMapping("api/account/business")
    ResponseEntity<?> changeBusinessAccountInfo(
            @Valid @RequestBody BusinessAccountChangeRequest businessAccountChangeRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();
        Long accountId = userPrincipal.getAccountId();
        Account account = accountService.findByAccountId(accountId);
        BusinessAccount businessAccount = businessAccountService.findByAccountId(accountId);

        if (businessAccountChangeRequest.getBusinessName() != null) {
            businessAccount.setBusinessName(businessAccountChangeRequest.getBusinessName());
        }
        if (businessAccountChangeRequest.getPassword() != null) {
            final String encryptedPassword = bCryptPasswordEncoder.encode(businessAccountChangeRequest.getPassword());
            account.setPassword(encryptedPassword);
        }
        if (businessAccountChangeRequest.getBio() != null) {
            account.setBio(businessAccountChangeRequest.getBio());
        }
        if (businessAccountChangeRequest.getPhoneNumber() != null) {
            businessAccount.setPhoneNumber(businessAccountChangeRequest.getPhoneNumber());
        }
        if (businessAccountChangeRequest.getBusinessTypeId() != null) {
            businessAccount.setBusinessType(businessTypeService
                    .findByBusinessTypeId(businessAccountChangeRequest.getBusinessTypeId()).orElse(null));
        }

        accountService.save(account);
        businessAccountService.save(businessAccount);

        return ResponseEntity.ok("Account saved");
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("api/account")
    ResponseEntity<?> deleteAccount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if(auth instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token provided");
        }

        UserDetailsImpl userPrincipal = (UserDetailsImpl) auth.getPrincipal();

        if(userPrincipal.getUserRole() == UserRole.USER) {
            userAccountService.deleteByAccountId(userPrincipal.getAccountId());
        } else {
            businessAccountService.deleteByAccountId(userPrincipal.getAccountId());
        }

        accountService.deleteByAccountId(userPrincipal.getAccountId());

        return ResponseEntity.ok("OK");
    }
}
