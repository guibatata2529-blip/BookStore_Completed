package br.com.unifecaf.bookstore.modules.reservations;

import br.com.unifecaf.bookstore.modules.books.BookModel;
import br.com.unifecaf.bookstore.modules.customers.CustomerModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_reservations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerModel customer;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookModel book;

    @Column(name = "reservation_date", nullable = false)
    private LocalDateTime reservationDate;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    public enum ReservationStatus {
        ACTIVE,
        CANCELLED,
        COMPLETED
    }
}
