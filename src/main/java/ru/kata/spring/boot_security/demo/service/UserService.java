package ru.kata.spring.boot_security.demo.service;



import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    void add(User user, Long[] rolesId);
    User updateUser(User user, Long[] rolesId);
    List<User> listUsers();
    void deleteUserById(Long id);
    User findById (Long id);
}
