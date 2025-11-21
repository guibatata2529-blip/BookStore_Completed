package br.com.unifecaf.bookstore.modules.reservations.dtos;

import br.com.unifecaf.bookstore.modules.reservations.ReservationModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {

    private Long id;
    private Long customerId;
    private String customerName;
    private Long bookId;
    private String bookTitle;
    private LocalDateTime reservationDate;
    private ReservationModel.ReservationStatus status;

}

