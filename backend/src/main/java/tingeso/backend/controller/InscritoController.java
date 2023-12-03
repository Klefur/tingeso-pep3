package tingeso.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backend.model.Horario;
import tingeso.backend.model.Inscrito;
import tingeso.backend.service.HorarioService;
import tingeso.backend.service.InscritoService;

import java.util.List;

@RestController
@RequestMapping("/inscrito")
@CrossOrigin
public class InscritoController {
    @Autowired
    InscritoService carServ;

    @GetMapping()
    public ResponseEntity<List<Inscrito>> findAll() {
        return carServ.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscrito> findById(@PathVariable Integer id) {
        return carServ.findByID(id);
    }

    @GetMapping("/horario/{idHorario}")
    public ResponseEntity<Integer> countInscritos(@PathVariable Integer idHorario) {
        return carServ.countInscritos(idHorario);
    }

    @GetMapping("/rut/{rut}")
    public ResponseEntity<List<Inscrito>> findByStudent(@PathVariable String rut) {
        return carServ.findByEstudiante(rut);
    }

    @PostMapping()
    public ResponseEntity<Inscrito> create(@RequestBody Inscrito horario) {
        return carServ.create(horario);
    }
}
