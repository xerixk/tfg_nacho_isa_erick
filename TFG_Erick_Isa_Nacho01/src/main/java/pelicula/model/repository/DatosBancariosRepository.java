package pelicula.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pelicula.model.entidades.DatosBancarios;

public interface DatosBancariosRepository extends JpaRepository<DatosBancarios, Integer>{

}
