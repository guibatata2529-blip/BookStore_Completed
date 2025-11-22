package br.com.unifecaf.bookstore.modules.orders.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderDTO {
    private List<OrderItemDTO> items;
    private String paymentMethod;
}
