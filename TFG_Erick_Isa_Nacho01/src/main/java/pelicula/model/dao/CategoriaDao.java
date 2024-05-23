package pelicula.model.dao;

import java.util.List;


import pelicula.model.entidades.Categoria;


public interface CategoriaDao {
	List<Categoria> findAll();
	Categoria findById(int idCategoria);
	void deleteCategoria(int idCategoria);
	Categoria insertOne(Categoria categoria);
}
