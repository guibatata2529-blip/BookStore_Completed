package br.com.unifecaf.bookstore.modules.orders;

import br.com.unifecaf.bookstore.modules.books.BookModel;
import br.com.unifecaf.bookstore.modules.books.BookRepository;
import br.com.unifecaf.bookstore.modules.customers.CustomerModel;
import br.com.unifecaf.bookstore.modules.customers.CustomerRepository;
import br.com.unifecaf.bookstore.modules.orders.dtos.CreateOrderDTO;
import br.com.unifecaf.bookstore.modules.orders.dtos.OrderDTO;
import br.com.unifecaf.bookstore.modules.orders.dtos.OrderItemDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final BookRepository bookRepository;

    public OrderService(OrderRepository orderRepository, CustomerRepository customerRepository, BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.bookRepository = bookRepository;
    }

    @Transactional
    public OrderDTO createOrder(Long customerId, CreateOrderDTO createOrderDTO) {
        CustomerModel customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        OrderModel order = new OrderModel();
        order.setCustomer(customer);
        order.setPaymentMethod(createOrderDTO.getPaymentMethod());

        BigDecimal subtotal = BigDecimal.ZERO;

        for (OrderItemDTO itemDTO : createOrderDTO.getItems()) {
            BookModel book = bookRepository.findById(itemDTO.getBookId())
                    .orElseThrow(() -> new RuntimeException("Book not found: " + itemDTO.getBookId()));

            OrderItemModel item = new OrderItemModel();
            item.setOrder(order);
            item.setBook(book);
            item.setQuantity(itemDTO.getQuantity());
            item.setUnitPrice(book.getPrice());
            item.setSubtotal(book.getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));

            order.getItems().add(item);
            subtotal = subtotal.add(item.getSubtotal());
        }

        // Calcular frete (fixo de R$ 10,00 para este exemplo)
        BigDecimal shippingFee = new BigDecimal("10.00");
        
        // Desconto (pode ser implementado futuramente)
        BigDecimal discount = BigDecimal.ZERO;

        order.setSubtotal(subtotal);
        order.setShippingFee(shippingFee);
        order.setDiscount(discount);
        order.setTotal(subtotal.add(shippingFee).subtract(discount));
        order.setStatus("CONFIRMED");

        OrderModel savedOrder = orderRepository.save(order);

        return mapToDTO(savedOrder);
    }

    public List<OrderDTO> getOrdersByCustomer(Long customerId) {
        List<OrderModel> orders = orderRepository.findByCustomerId(customerId);
        return orders.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long orderId) {
        OrderModel order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToDTO(order);
    }

    private OrderDTO mapToDTO(OrderModel order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setCustomerId(order.getCustomer().getId());
        dto.setCustomerName(order.getCustomer().getName());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());
        dto.setSubtotal(order.getSubtotal());
        dto.setShippingFee(order.getShippingFee());
        dto.setDiscount(order.getDiscount());
        dto.setTotal(order.getTotal());
        dto.setPaymentMethod(order.getPaymentMethod());

        List<OrderItemDTO> items = order.getItems().stream().map(item -> {
            OrderItemDTO itemDTO = new OrderItemDTO();
            itemDTO.setBookId(item.getBook().getId());
            itemDTO.setBookTitle(item.getBook().getTitle());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setUnitPrice(item.getUnitPrice());
            itemDTO.setSubtotal(item.getSubtotal());
            return itemDTO;
        }).collect(Collectors.toList());

        dto.setItems(items);
        return dto;
    }
}
