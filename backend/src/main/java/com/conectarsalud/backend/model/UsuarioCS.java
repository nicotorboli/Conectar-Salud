package com.conectarsalud.backend.model;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UsuarioCS extends Usuario{
    private String nombre;
    private String apellido;

    public UsuarioCS() {}

    public UsuarioCS(String nombre, String apellido, String email, String contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contraseña = contraseña;
        this.rol = Rol.USUARIO;
    }
}

