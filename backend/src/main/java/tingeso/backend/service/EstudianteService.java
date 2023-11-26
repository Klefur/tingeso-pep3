package tingeso.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tingeso.backend.model.Estudiante;
import tingeso.backend.repository.EstudianteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estRep;

    public ResponseEntity<List<Estudiante>> findAll() {
        return ResponseEntity.status(200).body(estRep.findAll());
    }

    public ResponseEntity<Estudiante> findByID(String id) {
        Optional<Estudiante> carrera = estRep.findById(id);

        if (carrera.isPresent()) {
            return ResponseEntity.status(200).body(carrera.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<Estudiante> create(Estudiante item) {
        try {
            return ResponseEntity.status(201).body(estRep.save(item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
