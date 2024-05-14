package pelicula.model.dao;

import java.util.List;


import pelicula.model.entidades.Guardar;
import pelicula.model.entidades.Pelicula;


public interface GuardarDao {
	List<Pelicula> findPeliculasByUsername(String username);
    boolean existsByUsuarioUsernameAndPeliculaIdPelicula(String username, Integer isPelicula);
    Guardar insertOne(Guardar guardar);
    void deleteByUsuarioUsernameAndPeliculaIdPelicula(String username, Integer peliculaId);

}
