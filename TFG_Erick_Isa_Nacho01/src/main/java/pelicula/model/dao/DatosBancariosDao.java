package pelicula.model.dao;

import pelicula.model.entidades.DatosBancarios;

public interface DatosBancariosDao {
	
	DatosBancarios findById(int idBancario);
	DatosBancarios insertOne(DatosBancarios bancario);

	
}
