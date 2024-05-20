package pelicula.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import pelicula.model.entidades.Categoria;
import pelicula.model.repository.CategoriaRepository;
import pelicula.model.repository.PeliculaRepository;

@Repository
public class CategoriaDaoImplMy87 implements CategoriaDao{

	@Autowired
	CategoriaRepository crepo;
	@Autowired
	PeliculaRepository prepo;
	
	
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

	@Transactional
	public void deleteCategoria(int idCategoria) {
		// TODO Auto-generated method stub
		Categoria categoria=crepo.findById(idCategoria).orElseThrow(()->new RuntimeException("Categoria no encontrada"));
		prepo.updateCategoriaToNull(idCategoria);
		crepo.delete(categoria);
	}

}
