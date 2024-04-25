package pelicula.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pelicula.model.entidades.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer>{

}
