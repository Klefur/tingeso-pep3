package tingeso.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tingeso.backend.model.Estudiante;
import tingeso.backend.model.Inscrito;
import tingeso.backend.repository.InscritoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InscritoService {
    @Autowired
    InscritoRepository notaRep;

    public ResponseEntity<List<Inscrito>> findAll() {
        return ResponseEntity.status(200).body(notaRep.findAll());
    }

    public ResponseEntity<Inscrito> findByID(Integer id) {
        Optional<Inscrito> carrera = notaRep.findById(id);

        if (carrera.isPresent()) {
            return ResponseEntity.status(200).body(carrera.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    public ResponseEntity<Inscrito> create(Inscrito item) {
        try {
            return ResponseEntity.status(201).body(notaRep.save(item));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    public ResponseEntity<Integer> countInscritos(Integer idHorario) {
        return ResponseEntity.status(200).body(notaRep.countAllByIdHorario(idHorario));
    }

    public ResponseEntity<List<Inscrito>> findByEstudiante(String rut) {
        Estudiante estudiante = new Estudiante();
        estudiante.setRut(rut);
        return ResponseEntity.status(200).body(notaRep.findAllByEstudiante(estudiante));
    }
}
