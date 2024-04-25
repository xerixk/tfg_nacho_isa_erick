package pelicula.model.dao;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import pelicula.model.entidades.Pelicula;
import pelicula.model.repository.PeliculaRepository;

public class PeliculaDaoImplMy8 implements PeliculaDao{

	@Autowired
	PeliculaRepository prepo;
	
	@Override
	public List<Pelicula> findAll() {
		// TODO Auto-generated method stub
		return prepo.findAll();
	}

	@Override
	public Pelicula findbyId(int idPelicula) {
		// TODO Auto-generated method stub
		return prepo.findById(idPelicula).orElse(null);
	}

	@Override
	public List<Pelicula> buscarDestacado() {
		// TODO Auto-generated method stub
		return prepo.findBydestacado();
	}

	@Override
	public List<Pelicula> buscarPorNombre(String nombre) {
		// TODO Auto-generated method stub
		return prepo.findByNombreContains(nombre);
	}

	@Override
	public List<Pelicula> buscarPorCategoria(int idCategoria) {
		// TODO Auto-generated method stub
		return prepo.findByCategoria(idCategoria);
	}

	@Override
	public Pelicula verDescripcion(int idPelicula) {
		// TODO Auto-generated method stub
		return prepo.findById(idPelicula).orElse(null);
	}

}
