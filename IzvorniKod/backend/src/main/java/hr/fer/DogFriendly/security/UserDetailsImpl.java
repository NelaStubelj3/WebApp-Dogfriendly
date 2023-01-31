package hr.fer.DogFriendly.security;

import java.util.Collection;

import hr.fer.DogFriendly.model.UserRole;
import org.apache.catalina.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import hr.fer.DogFriendly.model.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UserDetailsImpl implements UserDetails {
    private Long accountId;
    private String email;

    @JsonIgnore
    private String password;

    private UserRole userRole;

    private Boolean locked;
    private Boolean enabled;

    public static UserDetailsImpl build(Account account) {
		return new UserDetailsImpl(
				account.getAccountId(),
                account.getEmail(),
				account.getPassword(),
                account.getUserRole(),
                account.getLocked(),
                account.getEnabled());
	}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
