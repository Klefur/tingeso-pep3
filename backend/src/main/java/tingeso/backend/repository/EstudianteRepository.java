package tingeso.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backend.model.Estudiante;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, String> {

}
