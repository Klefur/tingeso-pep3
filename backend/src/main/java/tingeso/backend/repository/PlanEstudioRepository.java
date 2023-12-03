package tingeso.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backend.model.PlanEstudio;

@Repository
public interface PlanEstudioRepository extends JpaRepository<PlanEstudio, Integer> {
}
