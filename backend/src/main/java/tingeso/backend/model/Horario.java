package tingeso.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Data
@Table(name = "horario")
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String horas;
    @ManyToOne
    @JoinColumn(name = "cod_asig")
    @JsonBackReference
    private PlanEstudio ramo;
    @OneToMany
    @JsonIgnore
    private List<Inscrito> inscritos;
}
