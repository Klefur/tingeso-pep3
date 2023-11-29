package tingeso.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tingeso.backend.model.Horario;
import tingeso.backend.repository.HorarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HorarioService {
    @Autowired
    HorarioRepository estRep;

    public ResponseEntity<List<Horario>> findAll() {
        return ResponseEntity.status(200).body(estRep.findAll());
    }

    public ResponseEntity<Horario> findByID(Integer id) {
        Optional<Horario> carrera = estRep.findById(id);

        if (carrera.isPresent()) {
            return ResponseEntity.status(200).body(carrera.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<Horario> create(Horario item) {
        try {
            return ResponseEntity.status(201).body(estRep.save(item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
