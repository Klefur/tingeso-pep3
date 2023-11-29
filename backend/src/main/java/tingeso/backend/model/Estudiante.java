package tingeso.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@Data
@Table(name = "estudiante")
public class Estudiante {
    @Id
    private String rut;

    private String nombres;
    private String apellidos;
    private String email;
    @Column(name = "cod_carr")
    private Integer codCarr;
}
