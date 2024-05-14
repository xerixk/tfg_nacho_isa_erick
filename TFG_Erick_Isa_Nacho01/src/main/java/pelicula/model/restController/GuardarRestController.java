package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.GuardarDao;
import pelicula.model.dao.PeliculaDao;
import pelicula.model.dao.UsuarioDao;
import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.Guardar;
import pelicula.model.entidades.Pelicula;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/guardar")
public class GuardarRestController {
	
	@Autowired
	private GuardarDao gDao;
	@Autowired
	private PeliculaDao pDao;
	@Autowired
	private UsuarioDao uDao;
	
	@GetMapping("/todasPorUser/{username}")
	public List<Pelicula> mostrartodasPorUser(@PathVariable String username){
	
		return gDao.findPeliculasByUsername(username);
				
	}
	
	
	@GetMapping("/existe/{username}/{peliculaId}")
		public ResponseEntity<Boolean> existePeliculaGuardada(@PathVariable String username, @PathVariable Integer peliculaId) {
			boolean existe = gDao.existsByUsuarioUsernameAndPeliculaIdPelicula(username, peliculaId);
        return ResponseEntity.ok(existe);
	}
	
	@PostMapping("/insertar/{peliculaId}/{username}")
	public String alta(@PathVariable Integer peliculaId,@PathVariable String username) {
		Guardar guardar= new Guardar();
		guardar.setPelicula(pDao.findbyId(peliculaId));
		guardar.setUsuario(uDao.findByUsername(username));
		
		Guardar guardado= gDao.insertOne(guardar);
		if (guardado != null) {
            return "La película ha sido guardada exitosamente.";
        } else {
            return "Ocurrió un error al intentar guardar la película.";
        }
	}
	@DeleteMapping("/eliminar/{peliculaId}/{username}")
    public ResponseEntity<String> eliminarPeliculaGuardada(@PathVariable Integer peliculaId, @PathVariable String username) {
        try {
            gDao.deleteByUsuarioUsernameAndPeliculaIdPelicula(username, peliculaId);
            return ResponseEntity.ok("La película ha sido eliminada de la lista.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("No se pudo eliminar la película de la lista.");
        }
    }
}
