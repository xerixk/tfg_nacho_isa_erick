package pelicula.model.entidades;

import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import pelicula.model.dto.UsuarioDto;

@Entity
@Table(name = "DatosBancarios")
public class DatosBancarios {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bancario")
    private int idBancario;

   

    @Column(name = "nombre_titular", nullable = false)
    private String nombreTitular;

    @Column(name = "numero_tarjeta", nullable = false, length = 16)
    private String numeroTarjeta;

    @Column(name = "fecha_expiracion", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaExpiracion;

    @Column(name = "cvv", nullable = false, length = 3)
    private String cvv;
    
    @ManyToOne
    @JoinColumn(name = "username", nullable = false)
    private UsuarioDto usuario;

	public int getIdBancario() {
		return idBancario;
	}

	public void setIdBancario(int idBancario) {
		this.idBancario = idBancario;
	}

	public String getNombreTitular() {
		return nombreTitular;
	}

	public void setNombreTitular(String nombreTitular) {
		this.nombreTitular = nombreTitular;
	}

	public String getNumeroTarjeta() {
		return numeroTarjeta;
	}

	public void setNumeroTarjeta(String numeroTarjeta) {
		this.numeroTarjeta = numeroTarjeta;
	}

	public Date  getFechaExpiracion() {
		return fechaExpiracion;
	}

	public void setFechaExpiracion(Date  fechaExpiracion) {
		this.fechaExpiracion = fechaExpiracion;
	}

	public String getCvv() {
		return cvv;
	}

	public void setCvv(String cvv) {
		this.cvv = cvv;
	}

	

	public UsuarioDto getUsuario() {
		return usuario;
	}

	public void setUsuario(UsuarioDto usuario) {
		this.usuario = usuario;
	}

	public DatosBancarios() {
		super();
	}

	

	public DatosBancarios(int idBancario, String nombreTitular, String numeroTarjeta, Date  fechaExpiracion, String cvv,
			UsuarioDto usuario) {
		super();
		this.idBancario = idBancario;
		this.nombreTitular = nombreTitular;
		this.numeroTarjeta = numeroTarjeta;
		this.fechaExpiracion = fechaExpiracion;
		this.cvv = cvv;
		this.usuario = usuario;
	}

	@Override
	public int hashCode() {
		return Objects.hash(idBancario);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DatosBancarios other = (DatosBancarios) obj;
		return idBancario == other.idBancario;
	}

	@Override
	public String toString() {
		return "DatosBancarios [idBancario=" + idBancario + ", nombreTitular=" + nombreTitular + ", numeroTarjeta="
				+ numeroTarjeta + ", fechaExpiracion=" + fechaExpiracion + ", cvv=" + cvv + ", usuario=" + usuario
				+ "]";
	}
    
    
}
