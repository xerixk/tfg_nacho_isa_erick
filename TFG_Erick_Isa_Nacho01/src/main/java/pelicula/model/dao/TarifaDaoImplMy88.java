package pelicula.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.Tarifa;
import pelicula.model.repository.CategoriaRepository;
import pelicula.model.repository.PeliculaRepository;
import pelicula.model.repository.TarifaRepository;

@Repository
public class TarifaDaoImplMy88 implements TarifaDao{

	@Autowired
	TarifaRepository trepo;

	
	
	@Override
	public List<Tarifa> findAll() {
		// TODO Auto-generated method stub
		return trepo.findAll();
	}
	@Override
	public Tarifa findById(int idTarifa) {
		
			// TODO Auto-generated method stub
			return trepo.findById(idTarifa).orElse(null);
		}
	}

	
