package br.com.unifecaf.bookstore.modules.reservations;

import br.com.unifecaf.bookstore.modules.books.BookModel;
import br.com.unifecaf.bookstore.modules.books.BookRepository;
import br.com.unifecaf.bookstore.modules.customers.CustomerModel;
import br.com.unifecaf.bookstore.modules.customers.CustomerRepository;
import br.com.unifecaf.bookstore.modules.reservations.dtos.CreateReservationDTO;
import br.com.unifecaf.bookstore.modules.reservations.dtos.ReservationDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final CustomerRepository customerRepository;
    private final BookRepository bookRepository;
    private final ReservationMapper reservationMapper;

    public ReservationService(
            ReservationRepository reservationRepository,
            CustomerRepository customerRepository,
            BookRepository bookRepository,
            ReservationMapper reservationMapper
    ) {
        this.reservationRepository = reservationRepository;
        this.customerRepository = customerRepository;
        this.bookRepository = bookRepository;
        this.reservationMapper = reservationMapper;
    }

    public ReservationDTO createReservation(Long customerId, CreateReservationDTO createReservationDTO) {
        CustomerModel customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        BookModel book = bookRepository.findById(createReservationDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        ReservationModel reservation = new ReservationModel();
        reservation.setCustomer(customer);
        reservation.setBook(book);
        reservation.setReservationDate(LocalDateTime.now());
        reservation.setStatus(ReservationModel.ReservationStatus.ACTIVE);

        ReservationModel savedReservation = reservationRepository.save(reservation);
        return reservationMapper.map(savedReservation);
    }

    public List<ReservationDTO> getReservationsByCustomer(Long customerId) {
        CustomerModel customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<ReservationModel> reservations = reservationRepository.findByCustomer(customer);
        return reservations.stream()
                .map(reservationMapper::map)
                .collect(Collectors.toList());
    }

    public List<ReservationDTO> getActiveReservationsByCustomer(Long customerId) {
        CustomerModel customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<ReservationModel> reservations = reservationRepository.findByCustomerAndStatus(
                customer, ReservationModel.ReservationStatus.ACTIVE);
        return reservations.stream()
                .map(reservationMapper::map)
                .collect(Collectors.toList());
    }

    public ReservationDTO cancelReservation(Long customerId, Long reservationId) {
        ReservationModel reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (!reservation.getCustomer().getId().equals(customerId)) {
            throw new RuntimeException("Reservation does not belong to this customer");
        }

        if (reservation.getStatus() != ReservationModel.ReservationStatus.ACTIVE) {
            throw new RuntimeException("Only active reservations can be cancelled");
        }

        reservation.setStatus(ReservationModel.ReservationStatus.CANCELLED);
        ReservationModel savedReservation = reservationRepository.save(reservation);
        return reservationMapper.map(savedReservation);
    }

    public ReservationDTO getReservationById(Long reservationId) {
        Optional<ReservationModel> reservation = reservationRepository.findById(reservationId);
        return reservation.map(reservationMapper::map).orElse(null);
    }
}

