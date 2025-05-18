package com.conectarsalud.backend.repository;

import com.conectarsalud.backend.model.Rol;
import com.conectarsalud.backend.model.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByEmailAndRol(String email, Rol rol);

}
