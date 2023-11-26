package tingeso.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Column(name = "cod_carr")
    private Integer codCarr;
    private Integer nivel;
}
