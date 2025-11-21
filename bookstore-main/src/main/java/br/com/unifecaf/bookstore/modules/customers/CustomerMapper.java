package br.com.unifecaf.bookstore.modules.customers;

import br.com.unifecaf.bookstore.modules.customers.dtos.CustomerDTO;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerModel map(CustomerDTO dto) {
        CustomerModel customerModel = new CustomerModel();
        customerModel.setId(dto.getId());
        customerModel.setName(dto.getName());
        customerModel.setEmail(dto.getEmail());

        return customerModel;
    }

    public CustomerDTO map(CustomerModel model) {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(model.getId());
        customerDTO.setName(model.getName());
        customerDTO.setEmail(model.getEmail());

        return customerDTO;
    }
}
