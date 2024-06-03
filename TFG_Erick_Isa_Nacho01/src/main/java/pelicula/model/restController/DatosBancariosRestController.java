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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.CategoriaDao;
import pelicula.model.dao.DatosBancariosDao;
import pelicula.model.dao.UsuarioDao;
import pelicula.model.dto.UsuarioDto;
import pelicula.model.entidades.Categoria;
import pelicula.model.entidades.DatosBancarios;
import pelicula.model.repository.CategoriaRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/banco")
public class DatosBancariosRestController {
	
	@Autowired
	private DatosBancariosDao dbdao;
	@Autowired
	private UsuarioDao udao;
	
	
	@PostMapping("/alta")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> alta(@RequestBody DatosBancarios bancario) {
        try {
            UsuarioDto usuario = udao.findByUsername(bancario.getUsuario().getUsername());
            if (usuario == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body("Usuario no encontrado");
            }
            bancario.setUsuario(usuario);
            
            
            DatosBancarios banc = dbdao.insertOne(bancario);
            if (banc != null) {
            	System.err.println("Datos bancarios Reginstrados");
            	return ResponseEntity.status(HttpStatus.CREATED).body(banc);
            	
            } else {
            	System.err.println("Datos bancarios NO Reginstrados");
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

            }
        } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }
    
	@GetMapping("/porId/{idBancario}")
    public ResponseEntity<?> verPorId(@PathVariable int idBancario) {
        DatosBancarios bancario = dbdao.findById(idBancario);
        if (bancario != null) {
            return ResponseEntity.ok(bancario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Datos bancarios no encontrados.");
        }
    }
}