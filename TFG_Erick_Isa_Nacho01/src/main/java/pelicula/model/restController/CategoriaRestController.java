package pelicula.model.restController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

}
