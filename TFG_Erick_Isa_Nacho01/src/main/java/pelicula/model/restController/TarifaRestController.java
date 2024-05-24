package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.CategoriaDao;
import pelicula.model.dao.TarifaDao;
import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.Tarifa;
import pelicula.model.repository.CategoriaRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/tarifa")
public class TarifaRestController {
	
	@Autowired
	private TarifaDao tdao;
	
	@GetMapping("/todas")
	public List<Tarifa> mostrartodas(){
	
		return tdao.findAll();
	}
	

}
