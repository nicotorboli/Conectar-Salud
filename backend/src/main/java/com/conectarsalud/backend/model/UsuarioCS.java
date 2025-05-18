package com.conectarsalud.backend.model;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UsuarioCS extends Usuario{

    public UsuarioCS() {}

    public UsuarioCS( String email, String contraseña) {

        this.email = email;
        this.password = contraseña;
        this.rol = Rol.USUARIO;
    }
}

