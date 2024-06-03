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
import pelicula.model.entidades.Categoria;

import pelicula.model.repository.CategoriaRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categoria")
public class CategoriaRestController {
	
	@Autowired
	private CategoriaDao cdao;
	
	@GetMapping("/todas")
	public List<Categoria> mostrartodas(){
	
		return cdao.findAll();
	}
	@DeleteMapping("/eliminarCat/{idCategoria}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminar(@PathVariable int idCategoria) {
		 cdao.deleteCategoria(idCategoria);
		}
	
	@PostMapping("/alta")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> alta(@RequestBody Categoria categoria) {
	    try {
	        Categoria cat = cdao.insertOne(categoria);
	        if (cat != null) {
	            return ResponseEntity.ok(cat);
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                                 .body("Error al insertar la categoría en la base de datos.");
	        }
	    } catch (Exception e) {
	        
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                             .body("Error al insertar la categoría en la base de datos.");
	    }
	}
    @PutMapping("/actualizar/{idCategoria}")
    public ResponseEntity<?> actualizarCategoria(@PathVariable int idCategoria, @RequestBody Categoria categoria) {
    	try {
			Categoria exCategoria= cdao.findById(idCategoria);
			if (exCategoria == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró la categoría.");
			}

			exCategoria.setNombre(categoria.getNombre());
            
			Categoria updateCategoria = cdao.modificarOne(exCategoria);
			
            return ResponseEntity.ok(updateCategoria);


		} catch (Exception e) {
		
			// TODO: handle exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la categoría.");

		}
    }
   @GetMapping ("/porId/{idCategoria}")
   public Categoria verPorId(@PathVariable int idCategoria) {
	   return cdao.findById(idCategoria);
   }
	


}
