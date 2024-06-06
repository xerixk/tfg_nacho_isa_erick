package pelicula.model.restController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pelicula.model.dao.PerfilDao;
import pelicula.model.dao.TarifaDao;
import pelicula.model.dao.UsuarioDao;
import pelicula.model.dto.UserDto;
import pelicula.model.dto.UsuarioDto;
import pelicula.model.dto.tarifaDto;
import pelicula.model.entidades.Tarifa;
import pelicula.model.entidades.Usuario;
import pelicula.model.repository.TarifaRepository;
import pelicula.model.repository.UsuarioRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuarios")
public class UsuarioRestController {
	
	@Autowired
	UsuarioDao udao;
	
	@Autowired
	private PerfilDao pdao;
	@Autowired
	private TarifaDao tdao;
	
	
	
	@PostMapping("/alta")
    public ResponseEntity<UsuarioDto> alta(@RequestBody UsuarioDto usuario) {
		
		
		try {
	        usuario.setFecha_Registro(new Date());
	        usuario.addPerfil(pdao.findById(2));
	        usuario.setEnabled(1);

	        Tarifa tarifa = tdao.findById(usuario.getTarifa().getIdTarifa());
	        if (tarifa == null) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
	        }

	        usuario.setTarifa(tarifa);
	        UsuarioDto savedUsuario = udao.insertOne(usuario);
	        if (savedUsuario != null) {
	            return ResponseEntity.status(HttpStatus.CREATED).body(savedUsuario);
	        } else {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	        }

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }

       
        


       
    }
	
	
	@PutMapping("/updateTarifa")
	public ResponseEntity<?> updateTarifa(@RequestBody UserDto userDto) {
		try {
			  

			 String username = userDto.getUsername();
            Integer idTarifa = userDto.getIdTarifa();
	    

	    UsuarioDto usuario = udao.findByUsername(username);
	    if (usuario == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
	    }
	    
	    Tarifa tarifa= tdao.findById(idTarifa);
	    if (tarifa == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("La tarifa especificada no existe");
        }


	  usuario.setTarifa(tarifa);
	  
	   
	  udao.modificarOne(usuario);
	   return ResponseEntity.ok("tarifa actualizada Correctamente");
		}catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario");

		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UsuarioDto user) {
	    String username = user.getUsername();
	    String password = user.getPassword();
	    

	    UsuarioDto usuario = udao.findByUsername(username);

	    if (usuario != null && usuario.getPassword().equals(password)) {
	    	UserDto udto=new UserDto();
	    	udto.setUsername(usuario.getUsername()); 
	    	udto.setIdPerfil(usuario.getPerfiles().get(0).getIdPerfil());
	    	 udto.setIdTarifa(usuario.getTarifa() != null ? usuario.getTarifa().getIdTarifa() : null);
	    	 return ResponseEntity.ok(udto);

	    } else if (usuario.getPerfiles().stream().anyMatch(p -> p.getNombre().equalsIgnoreCase("admin"))) {
	    	
	    	 UserDto udto = new UserDto();
	         udto.setUsername(usuario.getUsername());
	         udto.setIdPerfil(usuario.getPerfiles().get(0).getIdPerfil());
	         udto.setIdTarifa(null);
	         return ResponseEntity.ok(udto);
	     } else {
	         return ResponseEntity.notFound().build();
	     }
	    }
	}
