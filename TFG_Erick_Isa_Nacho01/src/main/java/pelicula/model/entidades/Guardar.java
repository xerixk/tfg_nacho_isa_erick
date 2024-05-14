package pelicula.model.entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import pelicula.model.dto.UsuarioDto;

import java.util.Date;
import java.util.Objects;


/**
 * The persistent class for the guardar database table.
 * 
 */
@Entity
@NamedQuery(name="Guardar.findAll", query="SELECT g FROM Guardar g")
public class Guardar implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_guardar")
	private int idGuardar;


	//bi-directional many-to-one association to Pelicula
	@ManyToOne
	@JoinColumn(name="id_Pelicula")
	private Pelicula pelicula;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="username")
	private UsuarioDto usuario;

	public Guardar() {
	}

	public int getIdGuardar() {
		return this.idGuardar;
	}

	public void setIdGuardar(int idGuardar) {
		this.idGuardar = idGuardar;
	}

	

	public Pelicula getPelicula() {
		return this.pelicula;
	}

	public void setPelicula(Pelicula pelicula) {
		this.pelicula = pelicula;
	}

	public UsuarioDto getUsuario() {
		return this.usuario;
	}

	public void setUsuario(UsuarioDto usuarioDto) {
		this.usuario = usuarioDto;
	}

	@Override
	public int hashCode() {
		return Objects.hash(idGuardar, pelicula, usuario);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Guardar other = (Guardar) obj;
		return idGuardar == other.idGuardar && Objects.equals(pelicula, other.pelicula)
				&& Objects.equals(usuario, other.usuario);
	}

	@Override
	public String toString() {
		return "Guardar [idGuardar=" + idGuardar + ", pelicula=" + pelicula + ", usuario=" + usuario + "]";
	}

	
}