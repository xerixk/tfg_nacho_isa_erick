package pelicula.model.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import pelicula.model.entidades.Usuario;
import pelicula.model.repository.UsuarioRepository;

@Repository
public class UsuarioDaoImplMy8 implements UsuarioDao{

	@Autowired
	UsuarioRepository urepo;
	
	@Override
	public List<Usuario> findAll() {
		// TODO Auto-generated method stub
		return urepo.findAll();
	}

	@Override
	public int insertOne(Usuario usuario) {
		// TODO Auto-generated method stub
		try {
			if(! urepo.existsById(usuario.getUsername())) {
				urepo.save(usuario);
				return 1;
			}
			else return 0;
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return 0;
		}
	}

	@Override
	public Usuario buscarUnUserYpassword(String username, String password) {
		// TODO Auto-generated method stub
		return urepo.findByUsernameAndPassword(username, password);
	}

	@Override
	public Usuario findByUser(String username) {
		// TODO Auto-generated method stub
		return urepo.findById(username).orElse(null);
	}

}
