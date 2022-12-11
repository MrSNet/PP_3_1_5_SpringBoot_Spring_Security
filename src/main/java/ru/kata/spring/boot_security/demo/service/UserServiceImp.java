package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

@Transactional
@Service
public class UserServiceImp implements UserService {

    private final UserDao userDao;

    @Autowired
    public UserServiceImp(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public void add(User user) {
        userDao.add(user);
    }


    @Override
    public User updateUser(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public List<User> listUsers() {
        return userDao.listUsers();
    }

    @Override
    public void deleteUserById(Long id) {
        userDao.deleteUserById(id);
    }

    @Override
    public User findById(Long id) {
        return userDao.findById(id);
    }
}
