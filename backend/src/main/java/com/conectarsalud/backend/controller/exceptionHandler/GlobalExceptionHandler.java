package com.conectarsalud.backend.controller.exceptionHandler;

import com.conectarsalud.backend.service.exceptions.EmailYaRegistradoException;
import com.conectarsalud.backend.service.exceptions.UsuarioNoEncontrado;
import com.conectarsalud.backend.service.exceptions.UsuarioYaExistenteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioYaExistenteException.class)
    public ResponseEntity<ErrorResponse>handleUsuarioYaExistenteException(UsuarioYaExistenteException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {

        Map<String, String> mapErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
                    String clave = ((FieldError) error).getField();
                    String valor = error.getDefaultMessage();
                    mapErrors.put(clave, valor);
                }
        );

        ErrorResponse errorResponse = new ErrorResponse(mapErrors.toString(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

/*    @ExceptionHandler(value = {BadCredentialsException.class})
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                "Nombre de usuario o contraseña incorrectos",
                401
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }
*/
    @ExceptionHandler(value = {BadCredentialsException.class})
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                "Contraseña incorrecta",
                401
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = {UsuarioNoEncontrado.class})
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UsuarioNoEncontrado ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                "Este mail no se encuentra registrado",
                401
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(EmailYaRegistradoException.class)
    public ResponseEntity<ErrorResponse> handleEmailYaRegistrado(EmailYaRegistradoException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                "El email ya está registrado",
                409
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

}
