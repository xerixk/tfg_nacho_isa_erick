package pelicula.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pelicula.model.entidades.Usuario;


public interface UsuarioRepository extends JpaRepository<Usuario, String> {
		
	public Usuario findByUsernameAndPassword(String username, String password);

}
