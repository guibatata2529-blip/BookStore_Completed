package br.com.unifecaf.bookstore.modules.orders;

import br.com.unifecaf.bookstore.modules.customers.TokenService;
import br.com.unifecaf.bookstore.modules.orders.dtos.CreateOrderDTO;
import br.com.unifecaf.bookstore.modules.orders.dtos.OrderDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173"}, allowCredentials = "true")
public class OrderController {

    private final OrderService orderService;
    private final TokenService tokenService;

    public OrderController(OrderService orderService, TokenService tokenService) {
        this.orderService = orderService;
        this.tokenService = tokenService;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(
            @RequestBody CreateOrderDTO createOrderDTO,
            HttpServletRequest request
    ) {
        try {
            Long customerId = getCustomerIdFromRequest(request);
            OrderDTO order = orderService.createOrder(customerId, createOrderDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyOrders(HttpServletRequest request) {
        try {
            Long customerId = getCustomerIdFromRequest(request);
            List<OrderDTO> orders = orderService.getOrdersByCustomer(customerId);
            return ResponseEntity.ok(orders);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            OrderDTO order = orderService.getOrderById(id);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private Long getCustomerIdFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            return tokenService.extractCustomerId(token);
        }
        throw new RuntimeException("Token not found");
    }
}
