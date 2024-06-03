package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.PeliculaDao;
import pelicula.model.dao.TarifaDao;
import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.EstatusPelicula;
import pelicula.model.entidades.Pelicula;
import pelicula.model.entidades.Tarifa;
import pelicula.model.repository.PeliculaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/pelicula")
public class PeliculasRestController {
	
	@Autowired
	PeliculaDao pdao;
	@Autowired
	TarifaDao tdao;
	
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
	        System.out.println("Categoria ID recibido: " + pelicula.getCategoria());

	    	Tarifa tarifa=tdao.findById(pelicula.getTarifa().getIdTarifa());
	    	if (tarifa == null) {
                return ResponseEntity.badRequest().body("La tarifa no puede ser nula.");
            }
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
	@PutMapping("/actualizar/{idPelicula}")
    public ResponseEntity<?> actualizarPelicula(@PathVariable int idPelicula, @RequestBody Pelicula pelicula) {
        try {
            Pelicula exPelicula = pdao.findbyId(idPelicula);
            if (exPelicula == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró la película.");
            }

            exPelicula.setNombre(pelicula.getNombre());
            exPelicula.setDescripcion(pelicula.getDescripcion());
            exPelicula.setFechaEstreno(pelicula.getFechaEstreno());
            exPelicula.setDuracion(pelicula.getDuracion());
            exPelicula.setDestacado(pelicula.getDestacado());
            exPelicula.setEstrenos(pelicula.getEstrenos());
            exPelicula.setImagen(pelicula.getImagen());
            exPelicula.setReparto(pelicula.getReparto());
            exPelicula.setCategoria(pelicula.getCategoria());
            exPelicula.setTarifa(pelicula.getTarifa());
            exPelicula.setVideo(pelicula.getVideo());
           ;

            Pelicula updatePelicula = pdao.modificarOne(exPelicula);
            return ResponseEntity.ok(updatePelicula);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la película.");
        }
    }
	
}
