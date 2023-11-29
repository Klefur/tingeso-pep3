package tingeso.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tingeso.backend.model.Carrera;
import tingeso.backend.service.CarreraService;

import java.util.List;

@RestController
@RequestMapping("/carrera")
@CrossOrigin
public class CarreraController {
    @Autowired
    CarreraService carServ;

    @GetMapping()
    public ResponseEntity<List<Carrera>> findAll() {
        return carServ.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrera> findById(@PathVariable Integer id) {
        return carServ.findByID(id);
    }
}
