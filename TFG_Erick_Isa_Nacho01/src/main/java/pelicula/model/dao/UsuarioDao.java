package pelicula.model.dao;

import java.util.List;

import pelicula.model.entidades.Usuario;

public interface UsuarioDao {
	List<Usuario> findAll();
	int insertOne(Usuario usuario);
	Usuario buscarUnUserYpassword(String username, String password);
	Usuario findByUser(String username);

}
