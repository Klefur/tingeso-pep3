package tingeso.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tingeso.backend.model.PlanEstudio;
import tingeso.backend.repository.PlanEstudioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PlanEstudioService {
    @Autowired
    PlanEstudioRepository peRep;

    public ResponseEntity<List<PlanEstudio>> findAll() {
        return ResponseEntity.status(200).body(peRep.findAll());
    }

    public ResponseEntity<PlanEstudio> findByID(Integer id) {
        Optional<PlanEstudio> carrera = peRep.findById(id);

        if (carrera.isPresent()) {
            return ResponseEntity.status(200).body(carrera.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<PlanEstudio> create(PlanEstudio item) {
        try {
            return ResponseEntity.status(201).body(peRep.save(item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
