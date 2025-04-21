package com.conectarsalud.backend;

import com.conectarsalud.backend.dtos.AuthResponse;
import com.conectarsalud.backend.dtos.RegisterMedicoDTO;
import com.conectarsalud.backend.model.Medico;
import com.conectarsalud.backend.repository.UsuarioRepository;
import com.conectarsalud.backend.service.JwtService;
import com.conectarsalud.backend.service.exceptions.UsuarioYaExistenteException;
import com.conectarsalud.backend.service.impl.AuthServiceImpl;
import com.conectarsalud.backend.service.MedicoService;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private MedicoService medicoService;

    @InjectMocks
    private AuthServiceImpl authService;

    @Mock
    private Medico medico;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
        medico = new Medico(
                "Juan", "Perez", "juan@example.com", "123456789", null,
                "Cardiología", "MP12345", 100.0, "Buenos Aires", "Descripción", "password"
        );
    }

    @Test
    void seIntentaCrearUnMedicoConPrecioDeConsultaNegativo() {
        // Crear el DTO con precio de consulta negativo
        RegisterMedicoDTO dto = new RegisterMedicoDTO(
                "Nico", "Tor", "nico@mail.com", "123456789", "1111111",
                "nico1234", "Cardiología", "MAT123", -150.0, "CABA", "Excelente profesional"
        );

        // Crear un validador de Jakarta
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Validar el DTO
        var violations = validator.validate(dto);

        // Comprobar que haya violaciones (debería haber una violación porque el precio es negativo)
        assertFalse(violations.isEmpty());

        // Verificar que el mensaje de la violación sea el esperado (mensaje de la anotación @Positive)
        assertEquals("El precio debe ser mayor a 0", violations.iterator().next().getMessage());
    }



    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
    }
}