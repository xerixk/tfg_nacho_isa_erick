package pelicula.model.dao;

import java.util.List;

import pelicula.model.dto.UsuarioDto;



public interface UsuarioDao {
	UsuarioDto findByUsername(String username);
	boolean registro(UsuarioDto usuario);
	UsuarioDto insertOne(UsuarioDto usuario);
}
