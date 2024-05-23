package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.PeliculaDao;
import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.Pelicula;
import pelicula.model.repository.PeliculaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/pelicula")
public class PeliculasRestController {
	
	@Autowired
	PeliculaDao pdao;
	
	@GetMapping("/todas")
	public List<Pelicula> todas(){
		return pdao.findAll();
}
	
	@GetMapping("/todasPorUser/{username}")
	public List<Pelicula> todasPorTarifa(@PathVariable String username){
		return pdao.findByUsername(username);
}
	
	@GetMapping("/destacada")
	public List<Pelicula> destacado(){
		return pdao.buscarDestacado();
	}
	
	
	
	@GetMapping("/porCategoria/{idCategoria}")
	public List<Pelicula> buscarPorCategoria(@PathVariable int idCategoria) {
		return pdao.buscarPorCategoria(idCategoria);
	}
	
	@GetMapping("/porNombre/")
	public List<Pelicula> buscarIdnombre(@RequestParam String nombre) {
		return pdao.buscarPorNombre(nombre);
	}
	
	@GetMapping("/verDescripcion/{idVacante}")
	public Pelicula verDescripcion(@PathVariable int idVacante) {
		return pdao.findbyId(idVacante);

	}
	
	@DeleteMapping("/eliminarPeli/{idPelicula}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminar(@PathVariable int idPelicula) {
		 pdao.deletePelicula(idPelicula);
		}
	
	@PostMapping("/alta")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> alta(@RequestBody Pelicula pelicula) {
	    try {
	        Pelicula pel = pdao.insertOne(pelicula);
	        if (pel != null) {
	            return ResponseEntity.ok(pel);
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                                 .body("Error al insertar la categoría en la base de datos.");
	        }
	    } catch (Exception e) {
	        
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Error al insertar la categoría en la base de datos.");
	    }
	}
	
}
