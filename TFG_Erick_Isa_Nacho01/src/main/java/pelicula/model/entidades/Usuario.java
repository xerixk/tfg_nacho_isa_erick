package pelicula.model.entidades;

import java.io.Serializable;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


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

	 @OneToMany(mappedBy = "usuario")
	    private List<DatosBancarios> datosBancarios;

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

	
	public Tarifa getTarifa() {
		return tarifa;
	}

	public void setTarifa(Tarifa tarifa) {
		this.tarifa = tarifa;
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
	

	public List<DatosBancarios> getDatosBancarios() {
		return datosBancarios;
	}

	public void setDatosBancarios(List<DatosBancarios> datosBancarios) {
		this.datosBancarios = datosBancarios;
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
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		return Objects.equals(username, other.username);
	}

	@Override
	public String toString() {
		return "Usuario [username=" + username + ", apellidos=" + apellidos + ", email=" + email + ", enabled="
				+ enabled + ", fecha_Registro=" + fecha_Registro + ", nombre=" + nombre + ", password=" + password
				+ ", guardars=" + guardars + ", tarifa=" + tarifa + "]";
	}

	

}