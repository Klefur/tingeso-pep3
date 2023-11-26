package tingeso.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backend.model.Carrera;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Integer> {

}
