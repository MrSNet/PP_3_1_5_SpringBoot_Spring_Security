package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDtoServiceImp implements UserDtoService {

    private final RoleDao roleDao;

    @Autowired
    public UserDtoServiceImp(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public User userDtoToUser(UserDto userDto) {

        User user = new User();
        if (userDto.getRoles().length > 0) {
            List<Role> roleList = new ArrayList<>();
            for (int i = 0; i < userDto.getRoles().length; i++) {
                roleList.add(roleDao.findRoleById(Long.valueOf(userDto.getRoles()[i])));
            }
            user.setRoles(roleList);
        }

        user.setId(userDto.getId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        return user;
    }

    @Override
    public UserDto userToUserDto(User user) {

        return new UserDto(user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.getRoles().stream()
                        .map(Role::toString)
                        .toArray(String[]::new)
                );

    }

    @Override
    public List<UserDto> userListToUserDtoList(List<User> users) {
        return users.stream().map(this::userToUserDto).collect(Collectors.toList());
    }
}
