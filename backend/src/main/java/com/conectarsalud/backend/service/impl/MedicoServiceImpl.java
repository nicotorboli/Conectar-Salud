package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.model.Usuario;
import com.conectarsalud.backend.repository.MedicoRepository;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.MedicoService;
import com.conectarsalud.backend.service.exceptions.EmailYaRegistradoException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedicoServiceImpl implements MedicoService {

    private final MedicoRepository medicoRepository;
    private final  UsuarioRepository usuarioRepository;

    public MedicoServiceImpl(MedicoRepository medicoRepository, UsuarioRepository usuarioRepository, UsuarioRepository usuarioRepository1) {

        this.medicoRepository = medicoRepository;
        this.usuarioRepository = usuarioRepository1;
    }

    public List<Medico> obtenerTodosLosMedicos() {
        return medicoRepository.findAll();
    }

    @Override
    public Optional<Medico> findByMatriculaProfesional(String matriculaProfesional) {
        return medicoRepository.findByMatriculaProfesional(matriculaProfesional);
    }

    @Override
    public void deleteByMatriculaProfesional(String matriculaProfesional) {
        Medico medico = medicoRepository.findByMatriculaProfesional(matriculaProfesional).get();
        Usuario usuario = usuarioRepository.findByEmail(medico.getEmail()).get();
        medicoRepository.delete(medico);
        usuarioRepository.delete(usuario);
    }
    public List<Medico> obtenerTodosLosMedicosPorNombre(String nombre){
        return medicoRepository.buscarPorNombreCompleto( nombre);
    }
    // averiguar tanto por nombre o apellido
    public List<Medico> obtenerTodosPorEspecialidad(String especialidad){
        return  medicoRepository.findByEspecialidadContainingIgnoreCase(especialidad);
    }

    public void actualizar(Medico med){
        medicoRepository.save(med);
    }

    public  Medico findByEmail(String email){
        return medicoRepository.findByEmail(email).orElseThrow(() -> new EmailYaRegistradoException());
    }

    public boolean validarFormatoEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(regex);
    }

    public boolean verificarEmailDisponible(String email) {
        Medico medicoConEmail = medicoRepository.findByEmail(email).orElseThrow(() -> new EmailYaRegistradoException());

        return medicoConEmail.getMatriculaProfesional().equals(email);
    }

}
