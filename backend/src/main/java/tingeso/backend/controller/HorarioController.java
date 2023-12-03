package tingeso.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backend.model.Horario;
import tingeso.backend.service.HorarioService;

import java.util.List;

@RestController
@RequestMapping("/horario")
@CrossOrigin
public class HorarioController {
    @Autowired
    HorarioService carServ;

    @GetMapping()
    public ResponseEntity<List<Horario>> findAll() {
        return carServ.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Horario> findById(@PathVariable Integer id) {
        return carServ.findByID(id);
    }

    @PostMapping()
    public ResponseEntity<Horario> create(@RequestBody Horario horario) {
        System.out.println(horario.toString());
        return carServ.create(horario);
    }
}
