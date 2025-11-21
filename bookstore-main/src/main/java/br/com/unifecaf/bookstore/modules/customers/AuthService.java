package br.com.unifecaf.bookstore.modules.customers;


import br.com.unifecaf.bookstore.modules.customers.dtos.AuthenticateCustomerDTO;
import br.com.unifecaf.bookstore.modules.customers.dtos.AuthenticateCustomerResponseDTO;
import br.com.unifecaf.bookstore.modules.customers.dtos.CustomerDTO;
import br.com.unifecaf.bookstore.modules.customers.dtos.RegisterCustomerDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService (
        CustomerRepository customerRepository,
        CustomerMapper customerMapper,
        PasswordEncoder passwordEncoder,
        TokenService tokenService
    ) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public CustomerDTO registerCustomer(RegisterCustomerDTO registerCustomerDTO) {
        if (customerRepository.findByEmail(registerCustomerDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Customer already exists with this email");
        }

        CustomerModel customerModel = new CustomerModel();
        customerModel.setName(registerCustomerDTO.getName());
        customerModel.setEmail(registerCustomerDTO.getEmail());
        customerModel.setPassword(passwordEncoder.encode(registerCustomerDTO.getPassword()));

        CustomerModel savedCustomer = customerRepository.save(customerModel);

        return customerMapper.map(savedCustomer);
    }

    public AuthenticateCustomerResponseDTO authenticateCustomer(AuthenticateCustomerDTO authenticateCustomerDTO) {
        CustomerModel customer = customerRepository.findByEmail(authenticateCustomerDTO.getEmail())
            .orElseThrow(() -> new RuntimeException("Wrong credentials"));

        if (!passwordEncoder.matches(authenticateCustomerDTO.getPassword(), customer.getPassword())) {
            throw new RuntimeException("Wrong credentials");
        }

        String accessToken = tokenService.generateAccessToken(customer.getEmail(), customer.getId());
        String refreshToken = tokenService.generateRefreshToken(customer.getEmail(), customer.getId());

        customer.setRefreshToken(refreshToken);
        customerRepository.save(customer);

        CustomerDTO customerDTO = customerMapper.map(customer);

        return new AuthenticateCustomerResponseDTO(accessToken, refreshToken, customerDTO);
    }

    public AuthenticateCustomerResponseDTO refreshToken(String refreshToken) {
        CustomerModel customer = customerRepository.findByRefreshToken(refreshToken)
            .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        String newAccessToken = tokenService.generateAccessToken(customer.getEmail(), customer.getId());
        String newRefreshToken = tokenService.generateRefreshToken(customer.getEmail(), customer.getId());

        customer.setRefreshToken(newRefreshToken);
        customerRepository.save(customer);

        return new AuthenticateCustomerResponseDTO(newAccessToken, newRefreshToken);
    }

}