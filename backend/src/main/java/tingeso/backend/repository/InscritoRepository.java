package tingeso.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backend.model.Estudiante;
import tingeso.backend.model.Inscrito;

import java.util.List;

@Repository
public interface InscritoRepository extends JpaRepository<Inscrito, Integer> {
    public Integer countAllByIdHorario(Integer idHorario);
    public List<Inscrito> findAllByEstudiante(Estudiante estudiante);
}
