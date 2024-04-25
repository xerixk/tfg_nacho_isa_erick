package pelicula.model.dto;

public class CategoriaDto {
	
	private int idCategoria;
	private String descripcion;
	private String nombre;
	
	public CategoriaDto(int idCategoria, String descripcion, String nombre) {
		super();
		this.idCategoria = idCategoria;
		this.descripcion = descripcion;
		this.nombre = nombre;
	}

	public CategoriaDto() {
		super();
	}

	/**
	 * @return the idCategoria
	 */
	public int getIdCategoria() {
		return idCategoria;
	}

	/**
	 * @param idCategoria the idCategoria to set
	 */
	public void setIdCategoria(int idCategoria) {
		this.idCategoria = idCategoria;
	}

	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	
	
	
	


}
