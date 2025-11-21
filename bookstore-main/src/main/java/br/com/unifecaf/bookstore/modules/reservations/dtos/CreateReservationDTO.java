package br.com.unifecaf.bookstore.modules.reservations.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReservationDTO {

    private Long bookId;

}

