package com.conectarsalud.backend.repository;

import com.conectarsalud.backend.model.Medico;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
@Transactional
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    Optional<Medico> findByMatriculaProfesional(String matriculaProfesional);

    List<Medico> findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCase(String nombre, String apellido);

    @Query("SELECT m FROM Medico m WHERE " +
            "LOWER(CONCAT(m.nombre, ' ', m.apellido)) LIKE LOWER(CONCAT('%', :textoBusqueda, '%')) OR " +
            "LOWER(m.nombre) LIKE LOWER(CONCAT('%', :textoBusqueda, '%')) OR " +
            "LOWER(m.apellido) LIKE LOWER(CONCAT('%', :textoBusqueda, '%'))")
    List<Medico> buscarPorNombreCompleto(@Param("textoBusqueda") String textoBusqueda);

    List<Medico> findByEspecialidadContainingIgnoreCase(String especialidad);

    Medico findByEmail(String email);
    List<Medico> findByPrecioConsultaBetween(int precioMin, int precioMax);
}
