package com.conectarsalud.backend.service.impl;

import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.model.Usuario;
import com.conectarsalud.backend.repository.MedicoRepository;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.MedicoService;
import com.conectarsalud.backend.service.exceptions.UsuarioNoEncontrado;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
        Usuario usuario = usuarioRepository.findByEmail(medico.getEmail()).orElseThrow(() -> new UsuarioNoEncontrado("no se encontro el usuario"));
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
        return medicoRepository.findByEmail(email).orElseThrow(() -> new UsuarioNoEncontrado("el email no esta registrado"));
    }

    public boolean validarFormatoEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        return email.matches(regex);
    }

    public boolean verificarEmailDisponible(String emailViejo, String emailAActualizar) {
        Optional<Medico> medicoConEmail = medicoRepository.findByEmail(emailAActualizar);

        return medicoConEmail.isEmpty() || emailViejo.equals(medicoConEmail.get().getEmail())  ;
    }

    public List<Medico> medicosPrecioEntre(int min , int max){
        return  medicoRepository.findByPrecioConsultaBetween(min, max);
    }

    public List<Medico> medicosPorUbicacion(String ubicacion){
        return medicoRepository.findByUbicacionContainingIgnoreCase(ubicacion);
    }

    public Long idDeUsuarioPorMail(String email){

        Optional<Usuario> usuarioConMail = usuarioRepository.findByEmail(email);
        return usuarioConMail.orElseThrow().getId();
    }

    public boolean toggleLike(Long medicoId, Long usuarioId) {
        Medico medico = medicoRepository.findById(medicoId)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Set<Usuario> usuariosQueDieronLike = medico.getUsuariosQueDieronLike();

        boolean yaDioLike = usuariosQueDieronLike.contains(usuario);
        if (yaDioLike) {
            usuariosQueDieronLike.remove(usuario);
            usuario.getMedicosLikeados().remove(medico);
        } else {
            usuariosQueDieronLike.add(usuario);
            usuario.getMedicosLikeados().add(medico);
        }

        medico.actualizarLike();

        usuarioRepository.save(usuario);
        medicoRepository.save(medico);

        return !yaDioLike;
    }

    @Override
    public boolean usuarioDioLike(Long medicoId, Long usuarioId) {
        Medico medico = medicoRepository.findById(medicoId)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Set<Usuario> usuariosQueDieronLike = medico.getUsuariosQueDieronLike();

        return usuariosQueDieronLike.contains(usuario);
    }

    @Override
    public int cantidadDeLikes(Long medicoId) {
        Medico medico = medicoRepository.findById(medicoId)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        Set<Usuario> usuariosQueDieronLike = medico.getUsuariosQueDieronLike();

        return usuariosQueDieronLike.size();
    }

}
