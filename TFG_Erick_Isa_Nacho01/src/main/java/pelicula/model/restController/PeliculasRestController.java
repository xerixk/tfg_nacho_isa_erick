package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pelicula.model.entidades.Pelicula;
import pelicula.model.repository.PeliculaRepository;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/pelicula")
public class PeliculasRestController {
	
	@Autowired
	PeliculaRepository prepo;
	
	@GetMapping("/todas")
	public List<Pelicula> todas(){
		return prepo.findAll();
}
	
	@GetMapping("/todasPorUser/{username}")
	public List<Pelicula> todasPorTarifa(@PathVariable String username){
		return prepo.findByUsername(username);
}
	
	@GetMapping("/destacada")
	public List<Pelicula> destacado(){
		return prepo.findBydestacado();
	}
	
	@GetMapping("/estrenos")
	public List<Pelicula> estrenos(){
		return prepo.findByestrenos();
	}
	
	@GetMapping("/porCategoria/{idCategoria}")
	public List<Pelicula> buscarPorCategoria(@PathVariable int idCategoria) {
		return prepo.findByCategoria(idCategoria);
	}
	
	@GetMapping("/porNombre/")
	public List<Pelicula> buscarIdnombre(@RequestParam String nombre) {
		return prepo.findByNombreContains(nombre);
	}
	
	@GetMapping("/verDescripcion/{idVacante}")
	public Pelicula verDescripcion(@PathVariable int idVacante) {
		return prepo.findById(idVacante).orElse(null);

	}
	
}
