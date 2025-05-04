package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.model.Usuario;
import com.conectarsalud.backend.repository.MedicoRepository;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.MedicoService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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
    @Transactional
    @Override
    public void deleteByMatriculaProfesional(String matriculaProfesional) {
        Medico medico = medicoRepository.findByMatriculaProfesional(matriculaProfesional).get();
        Usuario usuario = usuarioRepository.findByEmail(medico.getEmail()).get();
        medicoRepository.delete(medico.getId());
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

}
