package tingeso.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tingeso.backend.model.Carrera;
import tingeso.backend.repository.CarreraRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CarreraService {
    @Autowired
    CarreraRepository carRep;

    public ResponseEntity<List<Carrera>> findAll() {
        return ResponseEntity.status(200).body(carRep.findAll());
    }

    public ResponseEntity<Carrera> findByID(Integer id) {
        Optional<Carrera> carrera = carRep.findById(id);

        if (carrera.isPresent()) {
            return ResponseEntity.status(200).body(carrera.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<Carrera> create(Carrera item) {
        try {
            return ResponseEntity.status(201).body(carRep.save(item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
