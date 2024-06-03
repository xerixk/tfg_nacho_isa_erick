package pelicula.model.dto;



import java.io.Serializable;
import jakarta.persistence.*;
import pelicula.model.entidades.Guardar;
import pelicula.model.entidades.Perfil;
import pelicula.model.entidades.Tarifa;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the usuarios database table.
 * 
 */
@Entity
@Table(name="usuarios")
public class UsuarioDto implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String username;

	private String apellidos;

	private String email;

	private int enabled;

	@Temporal(TemporalType.DATE)
	private Date fecha_Registro;

	private String nombre;

	private String password;
	
	@OneToMany(mappedBy="usuario")
	private List<Guardar> guardars;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tarifa", referencedColumnName = "id_tarifa")
	    private Tarifa tarifa;
	
	@ManyToMany
	@JoinTable(
		name="usuarioperfil"
		, joinColumns={
			@JoinColumn(name="username")
			}
		, inverseJoinColumns={
			@JoinColumn(name="id_Perfil")
			}
		)
	private List<Perfil> perfiles;


	public UsuarioDto() {
	}
	

	public UsuarioDto(String username, String apellidos, String email, int enabled, Date fecha_Registro, String nombre,
			String password, List<Guardar> guardars, Tarifa tarifa, List<Perfil> perfiles) {
		super();
		this.username = username;
		this.apellidos = apellidos;
		this.email = email;
		this.enabled = enabled;
		this.fecha_Registro = fecha_Registro;
		this.nombre = nombre;
		this.password = password;
		this.guardars = guardars;
		this.tarifa = tarifa;
		this.perfiles = perfiles;
	}


	public Tarifa getTarifa() {
		return tarifa;
	}

	public void setTarifa(Tarifa tarifa) {
		this.tarifa = tarifa;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getApellidos() {
		return this.apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getEnabled() {
		return this.enabled;
	}

	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}

	public Date getFecha_Registro() {
		return this.fecha_Registro;
	}

	public void setFecha_Registro(Date fecha_Registro) {
		this.fecha_Registro = fecha_Registro;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public List<Guardar> getGuardars() {
		return this.guardars;
	}

	public void setGuardars(List<Guardar> guardars) {
		this.guardars = guardars;
	}

	public Guardar addGuardar(Guardar guardar) {
		getGuardars().add(guardar);
		guardar.setUsuario(this);

		return guardar;
	}

	public Guardar removeGuardar(Guardar guardar) {
		getGuardars().remove(guardar);
		guardar.setUsuario(null);

		return guardar;
	}
	public List<Perfil> getPerfiles() {
		return this.perfiles;
	}

	public void setPerfiles(List<Perfil> perfiles) {
		this.perfiles = perfiles;
	}
	
	public void addPerfil(Perfil perfil) {
		if (perfiles == null)
			perfiles = new ArrayList<>();
		perfiles.add(perfil);
	}
	
	public void removePerfil(Perfil perfil) {
		if (perfiles == null)
			perfiles = new ArrayList<>();
		perfiles.remove(perfil);
	}
	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof UsuarioDto))
			return false;
		UsuarioDto other = (UsuarioDto) obj;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UsuarioDto [username=" + username + ", apellidos=" + apellidos + ", email=" + email + ", enabled="
				+ enabled + ", fecha_Registro=" + fecha_Registro + ", nombre=" + nombre + ", password=" + password
				+ ", guardars=" + guardars + ", tarifa=" + tarifa + ", perfiles=" + perfiles + "]";
	}


	
	
	

}