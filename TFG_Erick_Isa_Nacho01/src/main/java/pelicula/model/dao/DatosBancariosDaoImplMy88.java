package pelicula.model.dao;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import pelicula.model.dto.UsuarioDto;
import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.DatosBancarios;
import pelicula.model.repository.CategoriaRepository;
import pelicula.model.repository.DatosBancariosRepository;
import pelicula.model.repository.PeliculaRepository;
import pelicula.model.repository.UsuarioRepository;

@Repository
public class DatosBancariosDaoImplMy88 implements DatosBancariosDao{

	@Autowired
	DatosBancariosRepository dbrepo;
	@Autowired
	UsuarioRepository urepo;
	
	
	

	@Override
	public DatosBancarios findById(int idBancario) {
		// TODO Auto-generated method stub
		return dbrepo.findById(idBancario).orElse(null);
	}

	
	@Override
	public DatosBancarios insertOne(DatosBancarios bancario) {
		// TODO Auto-generated method stub
		try {
			return dbrepo.save(bancario);
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	
	}
}



	

