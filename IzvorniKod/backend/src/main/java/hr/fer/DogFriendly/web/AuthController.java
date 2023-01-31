package hr.fer.DogFriendly.web;

import java.util.Optional;

import javax.validation.Valid;

import hr.fer.DogFriendly.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import hr.fer.DogFriendly.payload.request.BusinessSignUpRequest;
import hr.fer.DogFriendly.payload.request.SignInRequest;
import hr.fer.DogFriendly.payload.request.UserSignUpRequest;
import hr.fer.DogFriendly.payload.response.JwtResponse;
import hr.fer.DogFriendly.security.JwtUtils;
import hr.fer.DogFriendly.security.UserDetailsImpl;
import hr.fer.DogFriendly.service.ConfirmationTokenService;
import hr.fer.DogFriendly.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class AuthController {
	private AuthenticationManager authenticationManager;

	private JwtUtils jwtUtils;

    private final UserService userService;

	private final ConfirmationTokenService confirmationTokenService;

	@CrossOrigin(origins = "*")
	@PostMapping("api/auth/sign-up/user")
	ResponseEntity<?> signUp(@Valid @RequestBody UserSignUpRequest userSignUpRequest) {
		if(userService.existsByEmail(userSignUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body("User with email: " + userSignUpRequest.getEmail() + " already exists");
		}
		System.out.println(userSignUpRequest);

		Account account = new Account();
		account.setPassword(userSignUpRequest.getPassword());
		account.setEmail(userSignUpRequest.getEmail());
		account.setBio(userSignUpRequest.getBio());
		account.setUserRole(UserRole.USER);

		UserAccount userAccount = new UserAccount();
		userAccount.setFirstName(userSignUpRequest.getFirstName());
		userAccount.setLastName(userSignUpRequest.getLastName());
		userAccount.setUsername(userSignUpRequest.getUsername());
		userAccount.setAccount(account);

		userService.signUpUser(userAccount);

		return ResponseEntity.ok("OK");
	}

	@CrossOrigin(origins = "*")
	@PostMapping("api/auth/sign-up/business")
	ResponseEntity<String> signUp(@Valid @RequestBody BusinessSignUpRequest businessSignUpRequest) {
		if(userService.existsByEmail(businessSignUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body("User with email: " + businessSignUpRequest.getEmail() + " already exists");
		}
		if(!userService.existsByBusinessTypeId(businessSignUpRequest.getBusinessTypeId())) {
			return ResponseEntity.badRequest().body("Business type with id " + businessSignUpRequest.getBusinessTypeId() + " does not exist");
		}
		System.out.println(businessSignUpRequest);

		Account account = new Account();
		account.setPassword(businessSignUpRequest.getPassword());
		account.setEmail(businessSignUpRequest.getEmail());
		account.setBio(businessSignUpRequest.getBio());
		account.setUserRole(UserRole.BUSINESS);

		BusinessAccount businessAccount = new BusinessAccount();
		businessAccount.setBusinessName(businessSignUpRequest.getBusinessName());
		businessAccount.setBusinessType(userService.findByBusinessTypeId(businessSignUpRequest.getBusinessTypeId()).orElse(null));
		businessAccount.setOib(businessSignUpRequest.getOib());
		businessAccount.setPhoneNumber(businessSignUpRequest.getPhoneNumber());
		businessAccount.setAccount(account);
		
		userService.signUpBusiness(businessAccount);

		return ResponseEntity.ok("OK");
	}

	@CrossOrigin(origins = "*")
	@GetMapping("api/auth/confirm")
	ResponseEntity<String> confirmMail(@RequestParam("token") String token) {

		Optional<ConfirmationToken> optionalConfirmationToken = confirmationTokenService.findConfirmationTokenByToken(token);

		if(optionalConfirmationToken.isPresent()) {
			userService.confirmAccount(optionalConfirmationToken.get());
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Requested confirmation token does not exist");
		}

		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}

	@CrossOrigin(origins = "*")
	@PostMapping("/api/auth/sign-in")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {
		
		Authentication authentication;

		try {
			authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));

		} catch(BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email or password is incorrect");
		}

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getAccountId(), 
												 userDetails.getEmail(),
												 userDetails.getUserRole(),
												 "Bearer"
												));
	}

}
