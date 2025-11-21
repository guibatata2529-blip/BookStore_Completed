package br.com.unifecaf.bookstore.modules.reservations;

import br.com.unifecaf.bookstore.modules.customers.CustomerModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationModel, Long> {
    List<ReservationModel> findByCustomer(CustomerModel customer);
    List<ReservationModel> findByCustomerAndStatus(CustomerModel customer, ReservationModel.ReservationStatus status);
}

