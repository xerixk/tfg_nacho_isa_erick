package pelicula.model.entidades;

import java.io.Serializable;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;


/**
 * The persistent class for the peliculas database table.
 * 
 */
@Entity
@Table(name="peliculas")
@NamedQuery(name="Pelicula.findAll", query="SELECT p FROM Pelicula p")
public class Pelicula implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_pelicula")
	private int idPelicula;

	private String descripcion;

	@Enumerated(value = EnumType.STRING)
	private EstatusPelicula estatus;

	private byte estrenos;

	private int fechaEstreno;

	private String imagen;

	private String nombre;

	private double precio;
	
	private int destacado;

	@Lob
	private String reparto;

	//bi-directional many-to-one association to Guardar
	@OneToMany(mappedBy="pelicula")
	private List<Guardar> guardars;

	//bi-directional many-to-one association to Categoria
	@ManyToOne
	@JoinColumn(name="id_Categoria")
	private Categoria categoria;

	public Pelicula() {
	}

	public int getIdPelicula() {
		return this.idPelicula;
	}

	public void setIdPelicula(int idPelicula) {
		this.idPelicula = idPelicula;
	}

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public EstatusPelicula getEstatus() {
		return this.estatus;
	}

	public void setEstatus(EstatusPelicula estatus) {
		this.estatus = estatus;
	}

	public byte getEstrenos() {
		return this.estrenos;
	}

	public void setEstrenos(byte estrenos) {
		this.estrenos = estrenos;
	}

	public int getFechaEstreno() {
		return this.fechaEstreno;
	}

	public void setFechaEstreno(int fechaEstreno) {
		this.fechaEstreno = fechaEstreno;
	}

	public String getImagen() {
		return this.imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getPrecio() {
		return this.precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}
	
	public int getDestacado() {
		return this.destacado;
	}

	public void setDestacado(int destacado) {
		this.destacado = destacado;
	}

	public String getReparto() {
		return this.reparto;
	}

	public void setReparto(String reparto) {
		this.reparto = reparto;
	}

	public List<Guardar> getGuardars() {
		return this.guardars;
	}

	public void setGuardars(List<Guardar> guardars) {
		this.guardars = guardars;
	}

	public Guardar addGuardar(Guardar guardar) {
		getGuardars().add(guardar);
		guardar.setPelicula(this);

		return guardar;
	}

	public Guardar removeGuardar(Guardar guardar) {
		getGuardars().remove(guardar);
		guardar.setPelicula(null);

		return guardar;
	}

	public Categoria getCategoria() {
		return this.categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	@Override
	public int hashCode() {
		return Objects.hash(idPelicula);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Pelicula other = (Pelicula) obj;
		return idPelicula == other.idPelicula;
	}

	@Override
	public String toString() {
		return "Pelicula [idPelicula=" + idPelicula + ", descripcion=" + descripcion + ", estatus=" + estatus
				+ ", estrenos=" + estrenos + ", fechaEstreno=" + fechaEstreno + ", imagen=" + imagen + ", nombre="
				+ nombre + ", precio=" + precio + ", reparto=" + reparto + ", guardars=" + guardars + ", categoria="
				+ categoria + "]";
	}

	
}