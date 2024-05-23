package pelicula.model.entidades;

import java.io.Serializable;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;


/**
 * The persistent class for the peliculas database table.
 * 
 */
@Entity
@Table(name="peliculas")
@NamedQuery(name="Pelicula.findAll", query="SELECT p FROM Pelicula p")
public class Pelicula implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_pelicula")
	private int idPelicula;

	private String descripcion;

	@Enumerated(value = EnumType.STRING)
	private EstatusPelicula estatus;

	private int estrenos;

	private int fechaEstreno;
	
	private int duracion;
	
	private String imagen;

	private String nombre;

	private int destacado;

	@Lob
	private String reparto;

	//bi-directional many-to-one association to Guardar
	

	//bi-directional many-to-one association to Categoria
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_Categoria", referencedColumnName = "id_categoria")
	private Categoria categoria;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "id_tarifa", referencedColumnName = "id_tarifa")
	    private Tarifa tarifa;

	public int getIdPelicula() {
		return idPelicula;
	}

	public void setIdPelicula(int idPelicula) {
		this.idPelicula = idPelicula;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public EstatusPelicula getEstatus() {
		return estatus;
	}

	public void setEstatus(EstatusPelicula estatus) {
		this.estatus = estatus;
	}

	public int getEstrenos() {
		return estrenos;
	}

	public void setEstrenos(int estrenos) {
		this.estrenos = estrenos;
	}

	public int getFechaEstreno() {
		return fechaEstreno;
	}

	public void setFechaEstreno(int fechaEstreno) {
		this.fechaEstreno = fechaEstreno;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getDestacado() {
		return destacado;
	}

	public void setDestacado(int destacado) {
		this.destacado = destacado;
	}

	public String getReparto() {
		return reparto;
	}

	public void setReparto(String reparto) {
		this.reparto = reparto;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public Tarifa getTarifa() {
		return tarifa;
	}

	public void setTarifa(Tarifa tarifa) {
		this.tarifa = tarifa;
	}
	public int getDuracion() {
		return duracion;
	}

	public void setDuracion(int duracion) {
		this.duracion = duracion;
	}
	 

	public static long getSerialversionuid() {
		return serialVersionUID;
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
				+ ", estrenos=" + estrenos + ", fechaEstreno=" + fechaEstreno + ", duracion=" + duracion + ", imagen="
				+ imagen + ", nombre=" + nombre + ", destacado=" + destacado + ", reparto=" + reparto + ", categoria="
				+ categoria + ", tarifa=" + tarifa + "]";
	}

	


	 
}