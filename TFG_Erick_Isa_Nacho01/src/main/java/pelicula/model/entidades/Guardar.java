package pelicula.model.entidades;

import java.io.Serializable;
import jakarta.persistence.*;
import java.util.Date;


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

	private String archivo;

	private String comentarios;

	private byte estado;

	@Temporal(TemporalType.DATE)
	private Date fecha;

	//bi-directional many-to-one association to Pelicula
	@ManyToOne
	@JoinColumn(name="id_Pelicula")
	private Pelicula pelicula;

	//bi-directional many-to-one association to Usuario
	@ManyToOne
	@JoinColumn(name="username")
	private Usuario usuario;

	public Guardar() {
	}

	public int getIdGuardar() {
		return this.idGuardar;
	}

	public void setIdGuardar(int idGuardar) {
		this.idGuardar = idGuardar;
	}

	public String getArchivo() {
		return this.archivo;
	}

	public void setArchivo(String archivo) {
		this.archivo = archivo;
	}

	public String getComentarios() {
		return this.comentarios;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}

	public byte getEstado() {
		return this.estado;
	}

	public void setEstado(byte estado) {
		this.estado = estado;
	}

	public Date getFecha() {
		return this.fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Pelicula getPelicula() {
		return this.pelicula;
	}

	public void setPelicula(Pelicula pelicula) {
		this.pelicula = pelicula;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

}