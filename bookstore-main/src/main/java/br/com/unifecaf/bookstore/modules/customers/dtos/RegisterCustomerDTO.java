package br.com.unifecaf.bookstore.modules.customers.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterCustomerDTO {

    private String name;
    private String email;
    private String password;

}
