package pelicula.model.dto;

import java.util.Objects;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pelicula.model.entidades.EstatusPelicula;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PeliculaDto {
	
	private int idPelicula;

	private String descripcion;
	@Enumerated(value = EnumType.STRING)
	private EstatusPelicula estatus;

	private byte estrenos;

	private int fechaEstreno;

	private String imagen;

	private String nombre;

	private double precio;
	@Lob
	private String reparto;

	private int idCategoria;


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

	public byte getEstrenos() {
		return estrenos;
	}

	public void setEstrenos(byte estrenos) {
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

	public double getPrecio() {
		return precio;
	}

	public void setPrecio(double precio) {
		this.precio = precio;
	}

	public String getReparto() {
		return reparto;
	}

	public void setReparto(String reparto) {
		this.reparto = reparto;
	}

	public int getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(int idCategoria) {
		this.idCategoria = idCategoria;
	}

	@Override
	public int hashCode() {
		return Objects.hash(idCategoria);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PeliculaDto other = (PeliculaDto) obj;
		return idCategoria == other.idCategoria;
	}

	@Override
	public String toString() {
		return "PeliculaDto [idPelicula=" + idPelicula + ", descripcion=" + descripcion + ", estatus=" + estatus
				+ ", estrenos=" + estrenos + ", fechaEstreno=" + fechaEstreno + ", imagen=" + imagen + ", nombre="
				+ nombre + ", precio=" + precio + ", reparto=" + reparto + ", idCategoria=" + idCategoria + "]";
	}
	
	
}
