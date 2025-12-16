package dev.example.demo.controller;
import dev.example.demo.CreditDTO.CreditDTO;
import dev.example.demo.entity.CreditCard;
import dev.example.demo.service.CreditCardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/credit-cards")
public class CreditController {
    private final CreditCardService creditCardService;

    public CreditController(CreditCardService creditCardService){
        this.creditCardService = creditCardService;
    }

    @PostMapping
    public ResponseEntity<String>addCreditCard(@RequestBody CreditDTO creditDTO){
        System.out.println("Added credit card: " + creditDTO);
        try{
            creditCardService.addCreditCard(creditDTO);
            return ResponseEntity.ok("Credit card has been added successfully!");
        } catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }
    @GetMapping("/{username}")
    public List <CreditCard> getUserCreditCards(@PathVariable String username){
        return creditCardService.getCreditCardsByUsername(username);
    }



    }

