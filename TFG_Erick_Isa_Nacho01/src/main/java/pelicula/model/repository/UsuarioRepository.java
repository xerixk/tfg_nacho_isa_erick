package pelicula.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pelicula.model.dto.UsuarioDto;
import pelicula.model.entidades.Usuario;


public interface UsuarioRepository extends JpaRepository<UsuarioDto, String> {
		

}
