package pelicula.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pelicula.model.entidades.Pelicula;

public interface PeliculaRepository  extends JpaRepository<Pelicula, Integer>{

	@Query("SELECT p FROM Pelicula p WHERE p.destacado= 1")
	public  List<Pelicula> findBydestacado();
	
	@Query("SELECT p FROM Pelicula p WHERE p.estrenos= 1")
	public  List<Pelicula> findByestrenos();
	
	@Query("SELECT p FROM Pelicula p WHERE p.nombre like %?1%")
	List<Pelicula> findByNombreContains(String nombre);
	
	@Query("SELECT p FROM Pelicula p WHERE p.categoria.idCategoria = ?1")
	public List<Pelicula> findByCategoria(int idCategoria);
	
}
