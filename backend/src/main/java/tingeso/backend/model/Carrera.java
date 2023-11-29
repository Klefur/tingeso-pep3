package tingeso.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Data
@Table(name = "carrera")
public class Carrera {
    @Id
    private Integer codigo;

    @Column(name = "nombre_carrera")
    private String nombreCarrera;
    @OneToMany(mappedBy = "carrera")
    private List<PlanEstudio> ramos;
}
