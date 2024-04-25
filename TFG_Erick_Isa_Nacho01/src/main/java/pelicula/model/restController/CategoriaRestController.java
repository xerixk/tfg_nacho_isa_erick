package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.entidades.Categoria;

import pelicula.model.repository.CategoriaRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categoria")
public class CategoriaRestController {
	
	@Autowired
	private CategoriaRepository crepo;
	
	@GetMapping("/todas")
	public List<Categoria> mostrartodas(){
	
		return crepo.findAll();
	}

}
