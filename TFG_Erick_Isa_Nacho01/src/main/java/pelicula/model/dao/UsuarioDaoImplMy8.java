package pelicula.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import pelicula.model.dto.UsuarioDto;
import pelicula.model.entidades.Tarifa;
import pelicula.model.entidades.Usuario;
import pelicula.model.repository.UsuarioRepository;

@Repository
public class UsuarioDaoImplMy8 implements UsuarioDao{

	@Autowired
	UsuarioRepository urepo;
	@Override
	public UsuarioDto findByUsername(String username) {
		// TODO Auto-generated method stub
		return urepo.findById(username).orElse(null);
	}
	@Override
	public boolean registro(UsuarioDto usuario) {
		if (findByUsername(usuario.getUsername()) == null) {
				urepo.save(usuario);
				return true;
		}
		return false;
	}
	
	@Override
	public UsuarioDto  insertOne(UsuarioDto usuario) {
		// TODO Auto-generated method stub
		try {
			return urepo.save(usuario);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@Override
	public UsuarioDto modificarOne(UsuarioDto usuario) {
		try {
			if(findByUsername(usuario.getUsername())!=null) {
				return urepo.save(usuario);
			}else {
				return null;
			}
		} catch (Exception e) {
			return null;
		}
		// TODO Auto-generated method stub
	
	}
}