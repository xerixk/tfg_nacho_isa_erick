package pelicula.model.restController;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.PerfilDao;
import pelicula.model.dao.UsuarioDao;
import pelicula.model.entidades.Usuario;
import pelicula.model.repository.UsuarioRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuario")
public class UsuarioRestController {
	
	@Autowired
	UsuarioDao udao;
	
	@Autowired
	PerfilDao pdao;
	
	@Autowired
	UsuarioRepository urepo;
	
	@PostMapping("/login")
	public Usuario login(@RequestBody Usuario usuario) {
		System.out.println(usuario.getUsername());
		System.out.println(usuario.getPassword());
		usuario.getPerfiles();
		return udao.buscarUnUserYpassword(usuario.getUsername(), usuario.getPassword());
	}
	
	@PostMapping("/registro")
	public Usuario registrar(@RequestBody Usuario usuario) {
			if(udao.insertOne(usuario) == 1) {
				usuario.setEnabled(1);
				usuario.setFecha_Registro(new Date());
				usuario.addPerfil(pdao.findbyIdPerfil(2));
			}
		return urepo.save(usuario);
	}

}
