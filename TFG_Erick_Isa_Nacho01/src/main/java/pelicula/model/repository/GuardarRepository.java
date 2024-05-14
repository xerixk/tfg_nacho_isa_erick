package pelicula.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;
import pelicula.model.entidades.Guardar;
import pelicula.model.entidades.Pelicula;

public interface GuardarRepository extends JpaRepository<Guardar, Integer>{
    @Query("SELECT g.pelicula FROM Guardar g WHERE g.usuario.username = ?1")
    List<Pelicula> findPeliculasByUsername(String username);
    boolean existsByUsuarioUsernameAndPeliculaIdPelicula(String username, Integer idPelicula);
   /*@Query("DELETE FROM Guardar g WHERE g.usuario.username = ?1 AND g.pelicula.idPelicula = ?2")
   boolean deleteByUsuarioUsernameAndPeliculaIdPelicula(String username, Integer peliculaId);*/
    @Transactional
    void deleteByUsuarioUsernameAndPeliculaIdPelicula(String username, Integer idPelicula);
}
