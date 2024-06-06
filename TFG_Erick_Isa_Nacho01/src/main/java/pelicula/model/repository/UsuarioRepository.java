package pelicula.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;
import pelicula.model.dto.UsuarioDto;
import pelicula.model.entidades.Tarifa;
import pelicula.model.entidades.Usuario;


public interface UsuarioRepository extends JpaRepository<UsuarioDto, String> {
		
	 UsuarioDto findByUsername(String username);
	
	  @Modifying
	    @Transactional
	    @Query("UPDATE Usuario u SET u.tarifa = ?2 WHERE u.username = ?1")
	    void updateTarifaByUsername(String username, Tarifa tarifa);
	 
}
