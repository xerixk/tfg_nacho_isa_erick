package pelicula.model.entidades;

import java.io.Serializable;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

@Entity
@Table(name = "tarifas")
@NamedQuery(name="Tarifa.findAll", query="SELECT t FROM Tarifa t")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Ignora propiedades específicas durante la serialización

public class Tarifa implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarifa")
    private Integer idTarifa;
	
    private String nombre;
    
    private double precio;
    

    public Tarifa() {
		super();
	}

	public Tarifa(String nombre, double precio) {
		super();
		this.nombre = nombre;
		this.precio = precio;
	}

	// Getters y setters
    public Integer getIdTarifa() {
        return idTarifa;
    }

    public void setIdTarifa(Integer idTarifa) {
        this.idTarifa = idTarifa;
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

	@Override
	public int hashCode() {
		return Objects.hash(idTarifa);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Tarifa other = (Tarifa) obj;
		return Objects.equals(idTarifa, other.idTarifa);
	}

	@Override
	public String toString() {
		return "Tarifa [idTarifa=" + idTarifa + ", nombre=" + nombre + ", precio=" + precio + "]";
	}
    
}
