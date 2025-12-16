package dev.example.demo.service;
import dev.example.demo.repository.UserRepository;
import dev.example.demo.repository.CCRepository;
import dev.example.demo.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final CCRepository ccRepository;
    public UserService(UserRepository userRepository, CCRepository ccRepository){
        this.userRepository = userRepository;
        this.ccRepository = ccRepository;
    }
    @Transactional(readOnly = true)
    public List<User>getAllUsers(){
        List<User>users = userRepository.findAll();
        System.out.println("Hibernate Data: " + users);
        return userRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Optional<User>getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }
    @Transactional
    public User createUser(User user){
        if(user.getPassword() == null || user.getPassword().isEmpty()){
            throw new IllegalArgumentException("Password cannot be null / empty");
        }
        return userRepository.save(user);
    }

    @Transactional
    public void updateUser(String username, Map<String, Object> updates){
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if(optionalUser.isEmpty()){
            throw new IllegalArgumentException("Unable to find user.");
        }
        User user = optionalUser.get();
        if(updates.containsKey("emailAddress")){
            throw new IllegalArgumentException("Unable to update email address.");
        }
        updates.forEach((key, value) -> {
            switch(key){
                case "name":
                    user.setName(value.toString());
                    break;
                case "homeAddress":
                    user.setHomeAddress(value.toString());
                    break;
                case "password":
                    user.setPassword(value.toString());
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field: " + key);

            }
        });
        userRepository.save(user);
    }

}
