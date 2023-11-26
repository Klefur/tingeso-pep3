package tingeso.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
