package tingeso.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tingeso.backend.model.Estudiante;
import tingeso.backend.service.EstudianteService;

import java.util.List;

@RestController
@RequestMapping("/estudiante")
public class EstudianteController {
    @Autowired
    EstudianteService estServ;

    @GetMapping()
    public ResponseEntity<List<Estudiante>> findAll() {
        return estServ.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estudiante> findById(@PathVariable String id) {
        return estServ.findByID(id);
    }
}
