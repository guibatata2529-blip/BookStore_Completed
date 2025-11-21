package br.com.unifecaf.bookstore.modules.reservations;

import br.com.unifecaf.bookstore.modules.customers.TokenService;
import br.com.unifecaf.bookstore.modules.reservations.dtos.CreateReservationDTO;
import br.com.unifecaf.bookstore.modules.reservations.dtos.ReservationDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@org.springframework.web.bind.annotation.CrossOrigin(origins = {"http://localhost:8080", "http://localhost:5173"}, allowCredentials = "true")
public class ReservationController {
    private final ReservationService reservationService;
    private final TokenService tokenService;

    public ReservationController(ReservationService reservationService, TokenService tokenService) {
        this.reservationService = reservationService;
        this.tokenService = tokenService;
    }

    @PostMapping
    public ResponseEntity<?> createReservation(
            @RequestBody CreateReservationDTO createReservationDTO,
            HttpServletRequest request
    ) {
        try {
            Long customerId = getCustomerIdFromRequest(request);
            ReservationDTO reservation = reservationService.createReservation(customerId, createReservationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getMyReservations(HttpServletRequest request) {
        try {
            Long customerId = getCustomerIdFromRequest(request);
            List<ReservationDTO> reservations = reservationService.getReservationsByCustomer(customerId);
            return ResponseEntity.ok(reservations);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/active")
    public ResponseEntity<?> getMyActiveReservations(HttpServletRequest request) {
        try {
            Long customerId = getCustomerIdFromRequest(request);
            List<ReservationDTO> reservations = reservationService.getActiveReservationsByCustomer(customerId);
            return ResponseEntity.ok(reservations);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable Long id) {
        ReservationDTO reservation = reservationService.getReservationById(id);
        if (reservation != null) {
            return ResponseEntity.ok(reservation);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation not found.");
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelReservation(
            @PathVariable Long id,
            HttpServletRequest request
    ) {
        try {
            Long customerId = getCustomerIdFromRequest(request);
            ReservationDTO reservation = reservationService.cancelReservation(customerId, id);
            return ResponseEntity.ok(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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

