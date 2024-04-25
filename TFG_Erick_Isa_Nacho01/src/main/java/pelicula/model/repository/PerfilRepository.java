package pelicula.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pelicula.model.entidades.Perfile;

public interface PerfilRepository extends JpaRepository<Perfile, Integer> {
	

}
