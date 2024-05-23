package pelicula.model.dao;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pelicula.model.entidades.EstatusPelicula;
import pelicula.model.entidades.Pelicula;
import pelicula.model.repository.PeliculaRepository;

@Repository
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

	@Override
	public List<Pelicula> findByUsername(String username) {
		// TODO Auto-generated method stub
		return prepo.findByUsername(username);
	}
	@Override
	public void deletePelicula(int idPelicula) {
		prepo.deleteById(idPelicula);
	}

	@Override
	public Pelicula insertOne(Pelicula pelicula) {
		// TODO Auto-generated method stub
		try {
			pelicula.setDestacado(0);
			pelicula.setEstatus(EstatusPelicula.PUBLICADA);
			pelicula.setEstrenos(0);
			return prepo.save(pelicula);
			
		} catch (Exception e) {
			e.printStackTrace();
	        return null;
		}
	}

	

}
