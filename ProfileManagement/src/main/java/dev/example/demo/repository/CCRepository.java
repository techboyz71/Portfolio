package dev.example.demo.repository;

import dev.example.demo.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.*;
import java.util.*;

@Repository
public interface CCRepository extends JpaRepository<CreditCard, Long> {
    @Query("SELECT c FROM CreditCard c JOIN FETCH c.user WHERE c.user.username = :username")
    List<CreditCard> findByUserUsername(@Param("username") String username);
}
