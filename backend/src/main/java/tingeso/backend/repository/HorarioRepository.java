package tingeso.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backend.model.Horario;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Integer> {

}
