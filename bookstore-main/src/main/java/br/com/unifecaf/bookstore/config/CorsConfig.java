package br.com.unifecaf.bookstore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Permite credenciais (cookies, authorization headers)
        config.setAllowCredentials(true);

        // URLs permitidas (frontend React)
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",  // Vite dev server
                "http://localhost:8080",  // Frontend Vite
                "http://localhost:3000"   // Create React App (caso use)
        ));

        // Headers permitidos
        config.addAllowedHeader("*");

        // Métodos HTTP permitidos
        config.setAllowedMethods(Arrays.asList(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS",
                "PATCH"
        ));

        // Expõe headers de resposta
        config.addExposedHeader("Authorization");

        // Tempo de cache do preflight
        config.setMaxAge(3600L);

        // Aplica configuração para todas as rotas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}