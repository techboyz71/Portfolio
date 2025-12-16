package dev.example.demo.service;

import dev.example.demo.entity.CreditCard;
import dev.example.demo.entity.User;
import dev.example.demo.CreditDTO.CreditDTO;
import dev.example.demo.repository.UserRepository;
import dev.example.demo.repository.CCRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
@Transactional
public class CreditCardService {
    private final CCRepository ccRepository;
    private final UserRepository userRepository;

    public CreditCardService(CCRepository ccRepository, UserRepository userRepository) {
        this.ccRepository = ccRepository;
        this.userRepository = userRepository;
    }



    public void addCreditCard(CreditDTO creditDTO) {
        CreditCard creditCard = new CreditCard();
        creditCard.setCardNumber(creditDTO.getCardNumber());
        creditCard.setExpiryDate(creditDTO.getExpiryDate());
        creditCard.setCvv(creditDTO.getCvv());

        User user = userRepository.findByUsername(creditDTO.getUsername()).orElseThrow(() -> new RuntimeException("User not found!"));
        creditCard.setUser(user);
        ccRepository.save(creditCard);
    }

    public List<CreditCard> getCreditCardsByUsername(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            System.out.println("Unable to find user given the username: " + username);
            return List.of();
        }
        List<CreditCard> cards = ccRepository.findByUserUsername(username);
        System.out.println("Found these credit cards: " + cards);
        return cards;
    }

}

