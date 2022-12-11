package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserDtoService {
    User userDtoToUser(UserDto userDto);
    UserDto userToUserDto(User user);
    List<UserDto> userListToUserDtoList(List<User> users);
}
