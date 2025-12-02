package com.docker.backend.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.docker.backend.model.User;
import com.docker.backend.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void whenSaveUser_thenFindByIdReturnsUser() {
        User u = new User();
        u.setName("Magda");

        User saved = userRepository.save(u);

        assertThat(userRepository.findById(saved.getId())).isPresent();
        assertThat(userRepository.findById(saved.getId()).get().getName()).isEqualTo("Magda");
    }
}
