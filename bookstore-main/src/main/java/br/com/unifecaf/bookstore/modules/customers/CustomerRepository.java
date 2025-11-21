package br.com.unifecaf.bookstore.modules.customers;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<CustomerModel, Long> {
    Optional<CustomerModel> findByEmail(String email);
    Optional<CustomerModel> findByRefreshToken(String refreshToken);
}
