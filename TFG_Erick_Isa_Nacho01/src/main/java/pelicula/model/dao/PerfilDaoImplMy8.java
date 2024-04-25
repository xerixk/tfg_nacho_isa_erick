package pelicula.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import pelicula.model.entidades.Perfile;
import pelicula.model.repository.PerfilRepository;


@Repository
@Service
public class PerfilDaoImplMy8  implements PerfilDao{
	
	@Autowired
	PerfilRepository  prepo;
	

	@Override
	public Perfile findbyIdPerfil(int idPerfil) {
		// TODO Auto-generated method stub
		return prepo.findById(idPerfil).orElse(null);
	}

}
