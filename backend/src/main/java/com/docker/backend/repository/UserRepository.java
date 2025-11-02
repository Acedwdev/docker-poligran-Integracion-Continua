package com.docker.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.docker.backend.model.User;


public interface UserRepository extends JpaRepository<User, Long> {}

