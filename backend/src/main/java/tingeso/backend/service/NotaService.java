package tingeso.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tingeso.backend.model.Nota;
import tingeso.backend.repository.NotaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NotaService {
    @Autowired
    NotaRepository notaRep;

    public ResponseEntity<List<Nota>> findAll() {
        return ResponseEntity.status(200).body(notaRep.findAll());
    }

    public ResponseEntity<Nota> findByID(Integer id) {
        Optional<Nota> carrera = notaRep.findById(id);

        if (carrera.isPresent()) {
            return ResponseEntity.status(200).body(carrera.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    public ResponseEntity<List<Nota>> findByUser(String codAlum) {
        List<Nota> notas = notaRep.findAllByCodAlumno(codAlum);
        return ResponseEntity.status(200).body(notas);
    }
    public ResponseEntity<Nota> create(Nota item) {
        try {
            return ResponseEntity.status(201).body(notaRep.save(item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
