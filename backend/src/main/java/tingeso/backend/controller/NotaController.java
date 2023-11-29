package tingeso.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backend.model.Nota;
import tingeso.backend.service.NotaService;

import java.util.List;

@RestController
@RequestMapping("/nota")
@CrossOrigin
public class NotaController {
    @Autowired
    NotaService carServ;

    @GetMapping()
    public ResponseEntity<List<Nota>> findAll() {
        return carServ.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> findById(@PathVariable Integer id) {
        return carServ.findByID(id);
    }

    @GetMapping("/estudiante/{codAlum}")
    public ResponseEntity<List<Nota>> findByUserCod(@PathVariable String codAlum) {
        return carServ.findByUser(codAlum);
    }
}
