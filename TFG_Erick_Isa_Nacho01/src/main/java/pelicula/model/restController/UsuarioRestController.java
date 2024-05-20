package pelicula.model.restController;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.PerfilDao;
import pelicula.model.dao.UsuarioDao;
import pelicula.model.dto.UsuarioDto;
import pelicula.model.entidades.Usuario;
import pelicula.model.repository.UsuarioRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuarios")
public class UsuarioRestController {
	
	@Autowired
	UsuarioDao udao;
	
	@Autowired
	private PerfilDao pdao;
	
	
	
	@PostMapping("/login")
	public ResponseEntity<UsuarioDto> login(@RequestBody Usuario user) {
	    String username = user.getUsername();
	    String password = user.getPassword();
	    

	    UsuarioDto usuario = udao.findByUsername(username);

	    if (usuario != null && usuario.getPassword().equals(password)) {
	        return ResponseEntity.ok(usuario);
	    } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}
	@PostMapping("/alta")
    public ResponseEntity<UsuarioDto> alta(@RequestBody UsuarioDto usuario) {
        usuario.setFecha_Registro(new Date());
        usuario.addPerfil(pdao.findById(2));
        usuario.setEnabled(1);

        UsuarioDto savedUsuario = udao.insertOne(usuario);

        if (savedUsuario != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUsuario);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
