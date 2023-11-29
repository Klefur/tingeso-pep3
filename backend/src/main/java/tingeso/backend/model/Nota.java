package tingeso.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "nota")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer year;
    private Double nota;
    private Integer sem;
    @JoinColumn(name = "cod_alumno")
    private String codAlumno;
    @Column(name = "cod_asig")
    private Integer codAsig;
}
