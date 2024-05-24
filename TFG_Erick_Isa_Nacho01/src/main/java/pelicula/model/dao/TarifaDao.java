package pelicula.model.dao;

import java.util.List;

import pelicula.model.entidades.Tarifa;


public interface TarifaDao {
	List<Tarifa> findAll();
	Tarifa findById(int idTarifa);
	
}
