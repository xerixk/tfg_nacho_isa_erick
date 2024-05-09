package pelicula.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.Guardar;
import pelicula.model.entidades.Pelicula;
import pelicula.model.repository.CategoriaRepository;
import pelicula.model.repository.GuardarRepository;

@Repository
public class GuardarDaoImplMy implements GuardarDao{

	@Autowired
	GuardarRepository grepo;

	@Override
	public List<Pelicula> findPeliculasByUsername(String username) {
		// TODO Auto-generated method stub
		return grepo.findPeliculasByUsername(username);
	}

	

	

	
	
	

}
