package com.conectarsalud.backend;

import com.conectarsalud.backend.service.MedicoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class BackendApplicationTests {
	@Autowired
	private MedicoService medicoService;
 	@Test
	void contextLoads() {
	}
	/*
	@Test
	void funcionalidadesNuevas(){

		assertEquals(1,medicoService.obtenerTodosLosMedicosPorNombre("Franco").size());
		assertEquals(0,medicoService.obtenerTodosLosMedicosPorNombre("FPe").size());
		assertNotNull(medicoService.findByMatriculaProfesional("MP-123456"));
		assertEquals(1 , medicoService.obtenerTodosPorEspecialidad("pediatria").size());
		assertEquals(0,  medicoService.obtenerTodosPorEspecialidad("algo").size());
	}

	 */

}

