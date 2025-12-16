package dev.example.demo.controller;
import dev.example.demo.entity.User;
import dev.example.demo.service.CreditCardService;
import dev.example.demo.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final CreditCardService creditCardService;

    public UserController(UserService userService, CreditCardService creditCardService) {
        this.userService = userService;
        this.creditCardService = creditCardService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        Optional<User> user = userService.getUserByUsername(username);
       if(user.isPresent()){
           return ResponseEntity.ok(user.get());
       } else{
            new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
       }
        return null;
    }

    @PostMapping
    public ResponseEntity<String>createUser(@RequestBody User user){
        System.out.println("User: " + user.getUsername() + ", Password: " + user.getPassword());
        try{
            userService.createUser(user);
            return ResponseEntity.ok("User has been created.");
        } catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("{username}")
    public ResponseEntity<String> updateUser(@PathVariable String username, @RequestBody Map<String, Object> updates){
        try{
            userService.updateUser(username, updates);
            return ResponseEntity.ok("User updated successfully!");
        } catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There was an error while updating the profile");
        }
    }

}

