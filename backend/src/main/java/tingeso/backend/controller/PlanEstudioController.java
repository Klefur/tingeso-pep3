package tingeso.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tingeso.backend.model.PlanEstudio;
import tingeso.backend.service.PlanEstudioService;

import java.util.List;

@RestController
@RequestMapping("/plan_estudio")
public class PlanEstudioController {
    @Autowired
    PlanEstudioService peServ;

    @GetMapping()
    public ResponseEntity<List<PlanEstudio>> findAll() {
        return peServ.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanEstudio> findById(@PathVariable Integer id) {
        return peServ.findByID(id);
    }
}
