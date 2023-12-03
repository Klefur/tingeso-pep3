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
@Table(name = "plan_estudio")
public class PlanEstudio {
    @Id
    @Column(name = "cod_asig")
    private Integer codAsig;

    @Column(name = "nom_asig")
    private String nomAsig;
    @Column(name = "cod_plan")
    private String codPlan;
    private Integer nivel;
    @ManyToOne
    @JoinColumn(name = "cod_carr")
    @JsonBackReference
    private Carrera carrera;
    @OneToMany(mappedBy = "planEstudio")
    private List<Prerrequisito> prerreqs;
    @OneToMany(mappedBy = "ramo")
    private List<Horario> horarios;
}