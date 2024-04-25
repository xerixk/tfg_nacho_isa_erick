package pelicula.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pelicula.model.entidades.Categoria;
import pelicula.model.repository.CategoriaRepository;

@Repository
public class CategoriaDaoImplMy87 implements CategoriaDao{

	@Autowired
	CategoriaRepository crepo;
	
	
	@Override
	public List<Categoria> findAll() {
		// TODO Auto-generated method stub
		return crepo.findAll();
	}

	@Override
	public Categoria findById(int idCategoria) {
		// TODO Auto-generated method stub
		return crepo.findById(idCategoria).orElse(null);
	}

}
