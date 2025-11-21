package br.com.unifecaf.bookstore.modules.customers;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class TokenService {

    @Value("${jwt.secret-key:6/ABsIPLhA1u9aGzoU1Wq9tryYKKSdFt8ECgiWPYxy4=}")
    private String secretKey;

    @Value("${jwt.access-token.expiration:15}")
    private long accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token.expiration:1440}")
    private long refreshTokenExpirationMinutes;


    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(String email, Long customerId) {
        Instant now = Instant.now();
        Instant expiration = now.plus(accessTokenExpirationMinutes, ChronoUnit.MINUTES);

        return Jwts.builder()
                .subject(email)
                .claim("customerId", customerId)
                .claim("type", "access")
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiration))
                .signWith(getSecretKey())
                .compact();
    }

    public String generateRefreshToken(String email, Long customerId) {
        Instant now = Instant.now();
        Instant expiration = now.plus(refreshTokenExpirationMinutes, ChronoUnit.MINUTES);

        return Jwts.builder()
                .subject(email)
                .claim("customerId", customerId)
                .claim("type", "refresh")
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiration))
                .signWith(getSecretKey())
                .compact();
    }

    public Claims validateToken(String token) {
        try {
            return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }

    public String extractEmail(String token) {
        Claims claims = validateToken(token);
        return claims.getSubject();
    }

    public Long extractCustomerId(String token) {
        Claims claims = validateToken(token);
        return claims.get("customerId", Long.class);
    }

    public boolean isRefreshToken(String token) {
        try {
            Claims claims = validateToken(token);
            String type = claims.get("type", String.class);
            return "refresh".equals(type);
        } catch (Exception e) {
            return false;
        }
    }
}
