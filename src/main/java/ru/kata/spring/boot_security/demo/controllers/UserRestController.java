package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserDtoService;

@RestController
public class UserRestController {

    private final UserDtoService userDtoService;

    public UserRestController(UserDtoService userDtoService) {
        this.userDtoService = userDtoService;
    }

    @GetMapping("/userRest")
    public ResponseEntity<UserDto> showUser(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(userDtoService.userToUserDto(user), HttpStatus.ACCEPTED);
    }
}
