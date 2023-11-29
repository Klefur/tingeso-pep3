package tingeso.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backend.model.Prerrequisito;

@Repository
public interface PrerrequisitoRepository extends JpaRepository<Prerrequisito, Integer> {

}
