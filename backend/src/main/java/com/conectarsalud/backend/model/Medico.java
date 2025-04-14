package com.conectarsalud.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
public class Medico extends Usuario{

    private String nombre;

    private String apellido;

    private String nroWhatsapp;

    private String nroLinea; // opcional

    private String especialidad;

    @Column(unique = true)
    private String matriculaProfesional;

    private Double precioConsulta;

    private String ubicacion;

    private String descripcion; // opcional

    public Medico(String nombre, String apellido, String email, String nroWhatsapp, String nroLinea, String especialidad,
                  String matriculaProfesional, Double precioConsulta, String ubicacion, String descripcion, String contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.nroWhatsapp = nroWhatsapp;
        this.nroLinea = nroLinea;
        this.especialidad = especialidad;
        this.matriculaProfesional = matriculaProfesional;
        this.precioConsulta = precioConsulta;
        this.ubicacion = ubicacion;
        this.descripcion = descripcion;
        this.contraseña = contraseña;
        this.rol = Rol.MEDICO;
    }

    public Medico() {}



}

