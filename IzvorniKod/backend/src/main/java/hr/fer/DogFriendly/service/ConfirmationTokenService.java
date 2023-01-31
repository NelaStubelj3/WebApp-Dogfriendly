package hr.fer.DogFriendly.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import hr.fer.DogFriendly.model.ConfirmationToken;
import hr.fer.DogFriendly.repository.ConfirmationTokenRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken confirmationToken) {
        confirmationTokenRepository.save(confirmationToken);
    }

    public void deleteConfirmationToken(Long id) {
        confirmationTokenRepository.deleteById(id);
    }

    public Optional<ConfirmationToken> findConfirmationTokenByToken(String token) {

		return confirmationTokenRepository.findConfirmationTokenByConfirmationToken(token);
	}
}
