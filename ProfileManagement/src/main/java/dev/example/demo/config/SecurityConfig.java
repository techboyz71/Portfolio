package dev.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for testing
                .authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.POST, "/api/credit-cards").permitAll().requestMatchers(HttpMethod.GET, "/api/**").permitAll().anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults());
       return http.build();
    }

}



