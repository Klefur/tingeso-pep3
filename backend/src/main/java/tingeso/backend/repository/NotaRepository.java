package tingeso.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.backend.model.Nota;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {

}
