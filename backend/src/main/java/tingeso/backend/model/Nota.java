package tingeso.backend.model;

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
    private Integer nivel;
    private Integer sem;
    @Column(name = "cod_alumno")
    private String codAlumno;
    @Column(name = "cod_asig")
    private Integer codAsig;
}
