package pelicula.model.dao;

import java.util.List;

import pelicula.model.entidades.Pelicula;

public interface PeliculaDao {
	
	List<Pelicula> findAll();
	Pelicula findbyId(int idPelicula);
	List<Pelicula> buscarDestacado();
	List<Pelicula> buscarPorNombre(String nombre);
	List<Pelicula> buscarPorCategoria(int idCategoria);
	Pelicula verDescripcion(int idPelicula);
	List<Pelicula> findByUsername(String username);
	void deletePelicula(int idPelicula);

}
