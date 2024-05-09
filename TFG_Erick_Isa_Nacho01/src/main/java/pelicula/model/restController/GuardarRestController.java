package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.Guardar;
import pelicula.model.entidades.Pelicula;
import pelicula.model.repository.CategoriaRepository;
import pelicula.model.repository.GuardarRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/guardar")
public class GuardarRestController {
	
	@Autowired
	private GuardarRepository grepo;
	
	@GetMapping("/todasPorUser/{username}")
	public List<Pelicula> mostrartodasPorUser(@PathVariable String username){
	
		return grepo.findPeliculasByUsername(username);
	}

}
