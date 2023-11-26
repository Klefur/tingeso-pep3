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
@Table(name = "carrera")
public class Carrera {
    @Id
    private Integer codigo;

    @Column(name = "nombre_carrera")
    private String nombreCarrera;
}
