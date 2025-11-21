package br.com.unifecaf.bookstore.modules.reservations;

import br.com.unifecaf.bookstore.modules.reservations.dtos.ReservationDTO;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

    public ReservationDTO map(ReservationModel model) {
        ReservationDTO dto = new ReservationDTO();
        dto.setId(model.getId());
        dto.setCustomerId(model.getCustomer().getId());
        dto.setCustomerName(model.getCustomer().getName());
        dto.setBookId(model.getBook().getId());
        dto.setBookTitle(model.getBook().getTitle());
        dto.setReservationDate(model.getReservationDate());
        dto.setStatus(model.getStatus());
        return dto;
    }
}

