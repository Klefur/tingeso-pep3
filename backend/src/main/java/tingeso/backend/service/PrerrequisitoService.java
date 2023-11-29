package tingeso.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tingeso.backend.model.Prerrequisito;
import tingeso.backend.repository.PrerrequisitoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PrerrequisitoService {
    @Autowired
    PrerrequisitoRepository carRep;

    public ResponseEntity<List<Prerrequisito>> findAll() {
        return ResponseEntity.status(200).body(carRep.findAll());
    }

    public ResponseEntity<Prerrequisito> findByID(Integer id) {
        Optional<Prerrequisito> carrera = carRep.findById(id);

        if (carrera.isPresent()) {
            return ResponseEntity.status(200).body(carrera.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<Prerrequisito> create(Prerrequisito item) {
        try {
            return ResponseEntity.status(201).body(carRep.save(item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
