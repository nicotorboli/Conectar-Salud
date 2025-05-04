package com.conectarsalud.backend.dtos;

import com.conectarsalud.backend.model.Medico;

public record MedicoDTO(
        Long id,
        String nombre,
        String apellido,
        String email,
        String nroWhatsapp,
        String nroLinea,
        String especialidad,
        String matriculaProfesional,
        Double precioConsulta,
        String ubicacion,
        String descripcion,
        byte[] fotoPerfil
) {
    public static MedicoDTO desdeModelo(Medico medico) {
        return new MedicoDTO(
                medico.getId(),
                medico.getNombre(),
                medico.getApellido(),
                medico.getEmail(),
                medico.getNroWhatsapp(),
                medico.getNroLinea(),
                medico.getEspecialidad(),
                medico.getMatriculaProfesional(),
                medico.getPrecioConsulta(),
                medico.getUbicacion(),
                medico.getDescripcion(),
                medico.getFotoPerfil());
    }

    public Medico aModelo(String contra){
        Medico medico = new Medico(nombre,  apellido,  email,  nroWhatsapp,  nroLinea,  especialidad,
                matriculaProfesional,  precioConsulta,  ubicacion,  descripcion,contra,this.fotoPerfil);
        medico.setId(this.id);
        return  medico;
    }
}
