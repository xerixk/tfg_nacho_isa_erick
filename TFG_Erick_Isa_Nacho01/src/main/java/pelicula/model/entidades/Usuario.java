package pelicula.model.entidades;

import java.io.Serializable;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the usuarios database table.
 * 
 */
@Entity
@Table(name="usuarios")
@NamedQuery(name="Usuario.findAll", query="SELECT u FROM Usuario u")
public class Usuario implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String username;

	private String apellidos;

	private int edad;

	private String email;

	private int enabled;

	@Temporal(TemporalType.DATE)
	private Date fecha_Registro;

	private String nombre;

	private String password;

	//bi-directional many-to-one association to Guardar
	@OneToMany(mappedBy="usuario")
	private List<Guardar> guardars;

	//bi-directional many-to-many association to Perfile
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
	private List<Perfile> perfiles;

	public Usuario() {
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

	public int getEdad() {
		return this.edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
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

	public List<Perfile> getPerfiles() {
		return this.perfiles;
	}

	public void setPerfiles(List<Perfile> perfiles) {
		this.perfiles = perfiles;
	}
	
	public void addPerfil(Perfile perfil) {
		if (perfiles == null)
			perfiles = new ArrayList<>();
		perfiles.add(perfil);
	}
	
	public void removePerfil(Perfile perfil) {
		if (perfiles == null)
			perfiles = new ArrayList<>();
		perfiles.remove(perfil);
	}

}