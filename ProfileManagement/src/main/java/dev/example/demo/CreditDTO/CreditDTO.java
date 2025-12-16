package dev.example.demo.CreditDTO;
import lombok.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
@Getter
@Setter
public class CreditDTO {
    private String username;
    private String cardNumber;
    private LocalDate expiryDate;
    private String cvv;

    public String getUsername(){
        return username;
    }
    public String getCardNumber(){
        return cardNumber;
    }

    public LocalDate getExpiryDate(){
        return expiryDate;
    }

    public String getCvv(){
        return cvv;
    }

    public void setExpiryDate(String expiryDate){
        this.expiryDate = LocalDate.parse(expiryDate);
    }
}
