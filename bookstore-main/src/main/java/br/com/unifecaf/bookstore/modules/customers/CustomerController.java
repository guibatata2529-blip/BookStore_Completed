package br.com.unifecaf.bookstore.modules.customers;

import br.com.unifecaf.bookstore.modules.customers.dtos.AuthenticateCustomerDTO;
import br.com.unifecaf.bookstore.modules.customers.dtos.AuthenticateCustomerResponseDTO;
import br.com.unifecaf.bookstore.modules.customers.dtos.CustomerDTO;
import br.com.unifecaf.bookstore.modules.customers.dtos.RefreshTokenDTO;
import br.com.unifecaf.bookstore.modules.customers.dtos.RegisterCustomerDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@org.springframework.web.bind.annotation.CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173"}, allowCredentials = "true")
public class CustomerController {
    private final AuthService authService;

    public CustomerController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/customer")
    public ResponseEntity<?> registerCustomer(@RequestBody RegisterCustomerDTO registerCustomerDTO) {
        try {
            CustomerDTO response = authService.registerCustomer(registerCustomerDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateCustomer(@RequestBody AuthenticateCustomerDTO authenticateCustomerDTO) {
        try {
            AuthenticateCustomerResponseDTO response = authService.authenticateCustomer(authenticateCustomerDTO);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {
        try {
            AuthenticateCustomerResponseDTO response = authService.refreshToken(refreshTokenDTO.getRefreshToken());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
