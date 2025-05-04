package com.conectarsalud.backend.dtos;

import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.model.Rol;
import jakarta.validation.constraints.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public record RegisterMedicoDTO(
        @NotEmpty String nombre,
        @NotEmpty String apellido,
        @Email String email,
        @NotEmpty String nroWhatsapp,
        String nroLinea,
        @NotEmpty String contraseña,
        @NotEmpty String especialidad,
        @NotEmpty String matriculaProfesional,
        @NotNull @Positive(message = "El precio debe ser mayor a 0") Double precioConsulta,
        @NotEmpty String ubicacion,
        String descripcion,
        MultipartFile fotoPerfil
) {

    public Medico aModelo(PasswordEncoder passwordEncoder,MultipartFile fotoPerfil) throws IOException {
        return new Medico(
                this.nombre,
                this.apellido,
                this.email,
                this.nroWhatsapp,
                this.nroLinea,
                this.especialidad,
                this.matriculaProfesional,
                this.precioConsulta,
                this.ubicacion,
                this.descripcion,
                passwordEncoder.encode(this.contraseña),
                fotoPerfil != null ? fotoPerfil.getBytes() : null
        );
    }

}

