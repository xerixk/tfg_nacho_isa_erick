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

	@Override
	public boolean existsByUsuarioUsernameAndPeliculaIdPelicula(String username, Integer idPelicula) {
		
		return grepo.existsByUsuarioUsernameAndPeliculaIdPelicula(username, idPelicula);
	}

	@Override
	public Guardar insertOne(Guardar guardar) {
		// TODO Auto-generated method stub
		try {
			return grepo.save(guardar);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public void deleteByUsuarioUsernameAndPeliculaIdPelicula(String username, Integer peliculaId) {
		// TODO Auto-generated method stub
		grepo.deleteByUsuarioUsernameAndPeliculaIdPelicula(username, peliculaId);;
	}

	

}
