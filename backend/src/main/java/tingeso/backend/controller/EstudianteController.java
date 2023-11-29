package tingeso.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backend.model.Estudiante;
import tingeso.backend.service.EstudianteService;

import java.util.List;

@RestController
@RequestMapping("/estudiante")
@CrossOrigin
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
