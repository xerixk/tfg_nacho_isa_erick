package pelicula.model.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import pelicula.model.entidades.Tarifa;

public interface TarifaRepository extends JpaRepository<Tarifa, Integer> {

}