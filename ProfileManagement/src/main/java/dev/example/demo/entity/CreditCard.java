package dev.example.demo.entity;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Table(name = "credit_cards", schema = "profile_management")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

   @NotNull
    private String cardNumber;

    @NotNull
    private LocalDate expiryDate;

    @NotNull
    private String cvv;

    public User getUser(){
        return user;
    }
    public void setUser(User user){
        this.user = user;
    }

    public String getCardNumber(){
        return cardNumber;
    }
    public void setCardNumber(String cardNumber){
        this.cardNumber = cardNumber;
    }

    public LocalDate getExpiryDate(){
        return expiryDate;
    }
    public void setExpiryDate(LocalDate expiryDate){
        this.expiryDate = expiryDate;
    }

    public String getCvv(){
        return cvv;
    }
    public void setCvv(String cvv){
        this.cvv = cvv;
    }
}
