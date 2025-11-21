package br.com.unifecaf.bookstore.modules.customers.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticateCustomerResponseDTO {

    private String accessToken;
    private String refreshToken;
    private CustomerDTO customer;

    public AuthenticateCustomerResponseDTO(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
