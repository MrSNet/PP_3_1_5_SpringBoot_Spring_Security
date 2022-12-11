package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserDtoService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
public class AdminRestController {

    private final UserService userService;
    private final UserDtoService userDtoService;

    @Autowired
    public AdminRestController(UserService userService, UserDtoService userDtoService) {
        this.userService = userService;
        this.userDtoService = userDtoService;

    }

    @GetMapping("/adminPanelRest")
    public ResponseEntity<List<UserDto>> showUsers() {

        return new ResponseEntity<>(userDtoService.userListToUserDtoList(userService.listUsers()),
                HttpStatus.ACCEPTED);
    }

    @GetMapping("/adminPanelRest/{id}")
    public ResponseEntity<UserDto> findUserById(@PathVariable("id") long id) {

        return new ResponseEntity<>(userDtoService.userToUserDto(userService.findById(id)), HttpStatus.ACCEPTED);
    }

    @GetMapping("/adminUserRest")
    public ResponseEntity<UserDto> showUser(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(userDtoService.userToUserDto(user), HttpStatus.ACCEPTED);
    }

    @PostMapping("/adminPanelRest/addUserRest")
    public ResponseEntity<HttpStatus> create(@RequestBody UserDto userDto) {

        userService.add(userDtoService.userDtoToUser(userDto));

        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @PatchMapping("/adminPanelRest/updateUserRest")
    public ResponseEntity<UserDto> update(@RequestBody UserDto userDto) {

        User user = userService.updateUser(userDtoService.userDtoToUser(userDto));

        return new ResponseEntity<>(userDtoService.userToUserDto(user), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/adminPanelRest/deleteUserRest/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {

        userService.deleteUserById(id);

        return ResponseEntity.ok(HttpStatus.OK);
    }


}
