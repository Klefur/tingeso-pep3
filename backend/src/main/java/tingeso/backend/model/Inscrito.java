package tingeso.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "inscrito")
@NoArgsConstructor
@Data
public class Inscrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JoinColumn(name = "cod_alum")
    @ManyToOne
    private Estudiante estudiante;
    @Column(name = "cod_asig")
    private Integer codAsig;
    @JoinColumn(name = "id_horario")
    @ManyToOne
    private Horario horario;
}
