package com.conectarsalud.backend.dtos;

import com.conectarsalud.backend.model.Medico;

public record MedicoDTO(
        String nombre,
        String apellido,
        String email,
        String nroWhatsapp,
        String nroLinea,
        String especialidad,
        String matriculaProfesional,
        Double precioConsulta,
        String ubicacion,
        String descripcion
) {
    public static MedicoDTO desdeModelo(Medico medico) {
        return new MedicoDTO(
                medico.getNombre(),
                medico.getApellido(),
                medico.getEmail(),
                medico.getNroWhatsapp(),
                medico.getNroLinea(),
                medico.getEspecialidad(),
                medico.getMatriculaProfesional(),
                medico.getPrecioConsulta(),
                medico.getUbicacion(),
                medico.getDescripcion());
    }

}
