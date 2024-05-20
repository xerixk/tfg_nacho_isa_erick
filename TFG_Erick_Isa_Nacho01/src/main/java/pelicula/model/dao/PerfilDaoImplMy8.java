package pelicula.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pelicula.model.entidades.Perfil;
import pelicula.model.repository.PerfilRepository;


@Repository
public class PerfilDaoImplMy8 implements PerfilDao{
	@Autowired
	PerfilRepository prepo;

	@Override
	public Perfil findById(int idPerfil) {
		// TODO Auto-generated method stub
		return prepo.findById(idPerfil).orElse(null);
	}
	
	

}
