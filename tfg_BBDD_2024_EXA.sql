drop database if exists tfg_BBDD_2024_EXA;
create database tfg_BBDD_2024_EXA;
use tfg_BBDD_2024_EXA;

CREATE TABLE `Categorias` (
  id_categoria int NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
   descripcion varchar(2000),
  PRIMARY KEY (id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into `tfg_BBDD_2024_EXA`.`categorias` (`id_categoria`, `nombre`, `descripcion`) values
(1,'Miedo','Miedo'),
(2,'Suspense','Suspense'),
(3,'Aventura','Aventura'),
(4,'Ciencia Ficción','Ciencia Ficción'),
(5,'Infantil','Infantil'),
(6,'Historia','Historia'),
(7,'Accion','Accion'),
(8,'Belico','Belico');

CREATE TABLE `Tarifas` (
  id_tarifa INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(200),
  precio DECIMAL(8, 2) NOT NULL,
  
  PRIMARY KEY (id_tarifa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Tarifas` (`id_tarifa`, `nombre`, `descripcion`, `precio`) VALUES
(1, 'Tarifa Basic', 'Acceso estándar a una selección limitada de películas y series a un precio asequible.', 10.00),
(2, 'Tarifa Premium', 'Acceso completo a todo el catálogo, incluyendo contenido exclusivo y estrenos, con calidad HD y la capacidad de ver en varios dispositivos.', 15.00),
(3, 'Tarifa Vip', 'Acceso exclusivo a todo, incluyendo estrenos y eventos especiales, con calidad UHD y HDR, además de beneficios adicionales.', 20.00);


-- DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE `Usuarios` (
  username varchar(45) NOT NULL PRIMARY KEY,
  nombre varchar(45) NOT NULL,
  apellidos varchar(100) not null,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  enabled int NOT NULL DEFAULT 1,
  fecha_Registro date,
  id_tarifa int not null,
  
  UNIQUE (email),
  FOREIGN KEY (id_tarifa) REFERENCES `Tarifas` (id_tarifa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into `Usuarios`(`username`,`nombre`,`apellidos`,`email`,`password`,`enabled`,`fecha_Registro`,`id_tarifa`) values 
('Xerixk','Erick','Suarez Tulmo','erick@gmail.com','erick1234',1,'2024-02-06',1),
('cliente','cliente','clienteApellido','cliente@gmail.com','cliente1',1,'2024-02-06',2),
('cliente2','cliente2','cliente2Apellido','cliente2@gmail.com','cliente2123',1,'2024-02-06',3);

-- DROP TABLE IF EXISTS `Vacantes`;
CREATE TABLE `Peliculas` (
  id_pelicula int NOT NULL AUTO_INCREMENT,
  nombre varchar(200) NOT NULL,
  descripcion text NOT NULL,
  fechaEstreno int NOT NULL,
  duracion int NOT NULL,
  -- 0 no destacada, 1 destacada
  destacado tinyint NOT NULL,
  estatus enum('GUARDADA','PUBLICADA') NOT NULL,
  Estrenos tinyint NOT NULL,
  imagen varchar(250) NOT NULL,
  reparto text NOT NULL,
  id_Categoria int NOT NULL,
  id_tarifa int NOT NULL,
  PRIMARY KEY (id_pelicula),
  FOREIGN KEY (id_categoria) REFERENCES `Categorias` (id_categoria),
  foreign key(id_tarifa) references`Tarifas`(id_tarifa)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO Peliculas (id_pelicula, nombre, descripcion, fechaEstreno, duracion, destacado, estatus, Estrenos, imagen, reparto, id_Categoria,id_tarifa) VALUES 
(1,'Misión Imposible: Protocolo Fantasma', 'Cuarta entrega de la serie cinematográfica Misión imposible. El agente Ethan Hunt, acusado de un atentado terrorista con bombas contra el Kremlin, es desautorizado junto con toda la organización, al poner en marcha el Presidente el “Protocolo Fantasma”. Abandonado a su suerte y sin recursos, el objetivo de Ethan es rehabilitar el buen nombre de su agencia e impedir un nuevo ataque. Pero Ethan emprende esta misión con un equipo formado por fugitivos, cuyos motivos personales no conoce bien.', '2011',133, 0, 'PUBLICADA', 0, 'imagen1.jpg', 'Tom Cruise, Jeremy Renner, Simon Pegg', 7,1),
(2,'Blade Runner 2049', 'Treinta años después de los eventos del primer film, un nuevo blade runner, K (Ryan Gosling) descubre un secreto profundamente oculto que podría acabar con el caos que impera en la sociedad. El descubrimiento de K le lleva a iniciar la búsqueda de Rick Deckard (Harrison Ford), un blade runner al que se le perdió la pista hace 30 años.', '2017', 164, 1, 'PUBLICADA', 0, 'imagen3.jpg', 'Ryan Gosling, Harrison Ford, Ana de Armas', 4,1),
(3,'The Blair Witch Project', 'El 21 de octubre de 1994, Heather Donahue, Joshua Leonard y Michael Williams entraron en un bosque de Maryland para rodar un documental sobre una leyenda local, "La bruja de Blair". No se volvió a saber de ellos. Un año después, fue encontrada la cámara con la que rodaron: mostraba los terroríficos hechos que dieron lugar a su desaparición.', '1999', 81, 1, 'PUBLICADA', 0, 'bruja.jpg', 'Heather Donahue, Michael C. Williams, Joshua Leonard y Patricia DeCou', 1,1),
(4,'El Conjuro', 'Basada en una historia real documentada por los reputados demonólogos Ed y Lorraine Warren. Narra los encuentros sobrenaturales que vivió la familia Perron en su casa de Rhode Island a principios de los 70. El matrimonio Warren, investigadores de renombre en el mundo de los fenómenos paranormales, acudieron a la llamada de esta familia aterrorizada por la presencia en su granja de un ser maligno.', '2013', 112, 0,'PUBLICADA', 0, 'elconjuro.jpg', 'Vera Farmiga, Patrick Wilson', 1,1),
(5,'IT', 'Son los años 80 en el pequeño pueblo de Derry, en el estado de Maine. En él vive una panda de siete niños conocidos como El club de los perdedores, que debe enfrentarse a sus problemas cotidianos con los matones de la escuela. Pero su vida da un giro inesperado cuando, durante el verano, una gran amenaza se cierne sobre ellos después de que una oleada de extrañas muertes provoquen el pánico y el terror entre los habitantes del lugar.', '2017',135, 0, 'PUBLICADA', 0, 'it.jpg', 'Bill Skarsgård, Jaeden Martell', 1,1),
(6,'El Silencio de los corderos', 'Un agente del FBI busca la ayuda de un psicópata encarcelado para atrapar a otro asesino en serie.', '1991', 118, 0, 'PUBLICADA', 0, 'silenciodelosinocentes.jpg', 'Jodie Foster, Anthony Hopkins', 2,1),
(7,'Perdida', 'Un hombre busca a su esposa desaparecida, pero descubre oscuros secretos en el proceso.', '2014', 115, 0, 'PUBLICADA', 0, 'perdida.jpg', 'Ben Affleck, Rosamund Pike', 2,1),
(8,'Indiana Jones: En Busca del Arca Perdida', 'El arqueólogo Indiana Jones busca el Arca de la Alianza antes que los nazis.', '1981', 115, 0, 'PUBLICADA', 0, 'indianajones.jpg', 'Harrison Ford, Karen Allen', 3,1),
(9, 'Jurassic Park', 'Un parque temático de dinosaurios se vuelve peligroso cuando los dinosaurios escapan.', '1993', 127, 0, 'PUBLICADA', 0, 'jurassicpark.jpg', 'Sam Neill, Laura Dern', 3,2),
(10,'Matrix', 'Un hacker descubre la verdad sobre la realidad y lucha contra las máquinas.', '1999', 136, 1, 'PUBLICADA', 0, 'matrix.jpg', 'Keanu Reeves, Laurence Fishburne', 4,2),
(11,'Rescatando al Soldado Ryan', 'Un grupo de soldados busca rescatar a un compañero en la Segunda Guerra Mundial.', '1998', 169, 1, 'PUBLICADA', 0, 'rescatandosoldadoryan.jpg', 'Tom Hanks, Matt Damon', 8,2),
(12,'Toy Story', 'Juguetes cobran vida cuando los humanos no están presentes.', '1995', 81, 1, 'PUBLICADA', 0, 'toystory.jpg', 'Tom Hanks, Tim Allen', 5,2),
(13, 'Frozen', 'Una princesa busca la ayuda de sus amigos mágicos para salvar a su reino.', '2013', 102, 0,'PUBLICADA', 0, 'frozen.jpg', 'Idina Menzel, Kristen Bell', 5,2),
(14, 'La Lista de Schindler', 'Un empresario salva a judíos durante el Holocausto.', '1993', 195, 1, 'PUBLICADA', 0, 'listaschindler.jpg', 'Liam Neeson, Ben Kingsley', 6,2),
(15, 'Braveheart', 'Un escocés lidera una revuelta contra la ocupación inglesa.', '1995', 178, 0, 'PUBLICADA', 0, 'braveheart.jpg', 'Mel Gibson, Sophie Marceau', 6,2),
(16, 'John Wick', 'Un exasesino busca venganza por la muerte de su perro.', '2014', 101, 0, 'PUBLICADA', 0, 'johnwick.jpg', 'Keanu Reeves, Michael Nyqvist', 7,2),
(17, 'Hacksaw Ridge', 'Un objetor de conciencia salva a 75 compañeros soldados durante la Batalla de Okinawa.', '2016', 139, 0, 'PUBLICADA', 0, 'hacksawridge.jpg', 'Andrew Garfield, Sam Worthington', 8,3),
(18, 'Malditos Bastardos', 'Durante la Segunda Guerra Mundial, un grupo de soldados judíos y aliados intenta llevar a cabo una misión para acabar con líderes nazis.', '2009', 146, 1, 'PUBLICADA', 0, 'malditosbastardos.jpg', 'Brad Pitt, Christoph Waltz', 8,3),
(19, 'Hereditary', 'Una familia comienza a descubrir oscuros secretos tras la muerte de su abuela, desencadenando eventos terroríficos.', '2018', 127, 1 , 'PUBLICADA', 0, 'hereditary.jpg', 'Toni Collette, Alex Wolff, Milly Shapiro', 1,3),
(20, 'Dune: Parte Dos', 'Tras los sucesos de la primera parte acontecidos en el planeta Arrakis, el joven Paul Atreides se une a la tribu de los Fremen y comienza un viaje espiritual y marcial para convertirse en mesías, mientras intenta evitar el horrible pero inevitable futuro que ha presenciado: una Guerra Santa en su nombre, que se extiende por todo el universo conocido... Secuela de Dune (2021). ', '2024', 166 , 0, 'PUBLICADA', 1, 'Dune2.jpg', 'Timothée Chalamet, Zendaya, Javier Bardem, Rebecca Ferguson, Austin Butler, Josh Brolin, Florence Pugh', 4,3),
(21, 'El especialista', 'Es doble de acción y, como todo el mundo en la comunidad de dobles de acción, explota, recibe disparos, se estrella, atraviesa ventanas y cae desde las mayores alturas, todo para nuestro entretenimiento. Y ahora, recién salido de un accidente que casi acaba con su carrera, este héroe de clase trabajadora tiene que localizar a una estrella de cine desaparecida, resolver una conspiración e intentar recuperar al amor de su vida sin dejar de hacer su trabajo diario. ¿Qué podría salir bien?', '2024', 125 , 0, 'PUBLICADA', 1, 'especialista.jpg', 'Ryan Gosling, Emily Blunt, Aaron Taylor-Johnson, Stephanie Hsu, Winston Duke, Hannah Waddingham', 7,3),
(22, 'Oppenheimer', 'En tiempos de guerra, el brillante físico estadounidense Julius Robert Oppenheimer, al frente del Proyecto Manhattan, lidera los ensayos nucleares para construir la bomba atómica para su país. Impactado por su poder destructivo, Oppenheimer se cuestiona las consecuencias morales de su creación. Desde entonces y el resto de su vida, se opondría firmemente al uso de armas nucleares. ', '2023', 180 , 0, 'PUBLICADA', 1, 'openhaimer.jpg', 'Cillian Murphy, Emily Blunt, Robert Downey Jr., Matt Damon, Josh Hartnett, Florence Pugh', 6,3),
(23, 'Pobres criaturas', 'Bella Baxter es una joven revivida por el brillante y poco ortodoxo científico Dr. Godwin Baxter. Bajo la protección de Baxter, Bella está ansiosa por aprender. Hambrienta de la mundanidad que le falta, Bella se escapa con Duncan Wedderburn, un sofisticado y perverso abogado, en una aventura vertiginosa a través de los continentes. Libre de los prejuicios de su época, Bella se vuelve firme en su propósito de defender la igualdad y la liberación. ', '2024', 141 , 0, 'PUBLICADA', 1, 'criaturas.jpg', 'Emma Stone, Mark Ruffalo, Willem Dafoe., Ramy Youssef, Christopher Abbott, Jerrod Carmichael', 4,3),
(24, 'La sociedad de la nieve', 'En 1972, el vuelo 571 de la Fuerza Aérea Uruguaya, fletado para llevar a un equipo de rugby a Chile, se estrella en un glaciar en el corazón de los Andes. Solo 29 de sus 45 pasajeros sobreviven al accidente. Atrapados en uno de los entornos más inaccesibles y hostiles del planeta, se ven obligados a recurrir a medidas extremas para mantenerse con vida. ', '2023', 144 , 0, 'PUBLICADA', 1, 'sociedad.png', 'Enzo Vogrincic, Agustín Pardella, Matías Recalt, Esteban Bigliardi, Diego Vegezzi, Fernando Contigiani García, Esteban Kukuriczka, Rafael Federman, Francisco Romero ', 6,3);





-- DROP TABLE IF EXISTS `Solicitudes`;
CREATE TABLE `Guardar` (
  id_guardar int NOT NULL AUTO_INCREMENT,
  fecha date NOT NULL,
  archivo varchar(250) NOT NULL,
  comentarios varchar(2000),
  estado  tinyint NOT NULL default 0,
  -- 0 presentada, 1 adjudicada
  id_Pelicula int NOT NULL,
  username varchar(45) NOT NULL,
  PRIMARY KEY (id_guardar),
  UNIQUE(id_Pelicula,username),
  FOREIGN KEY (username) REFERENCES `Usuarios` (username),
  FOREIGN KEY (id_Pelicula) REFERENCES `Peliculas` (id_pelicula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- DROP TABLE IF EXISTS `UsuarioPerfil`;


CREATE TABLE DatosBancarios (
  id_bancario int NOT NULL AUTO_INCREMENT,
  username varchar(45) NOT NULL,
  nombre_titular varchar(100) NOT NULL,
  numero_tarjeta varchar(16) NOT NULL,
  fecha_expiracion DATE NOT NULL,
  cvv varchar(3) NOT NULL,
  direccion_facturacion varchar(200) NOT NULL,
  PRIMARY KEY (id_bancario),
  FOREIGN KEY (username) REFERENCES Usuarios (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO DatosBancarios (username, nombre_titular, numero_tarjeta, fecha_expiracion, cvv, direccion_facturacion)VALUES
('Xerixk', 'Erick Suarez Tulmo', '1234567890123456', STR_TO_DATE('12/25', '%m/%y'), '123', 'Calle Ejemplo, Ciudad Ejemplo'),
('cliente', 'Cliente Apellido', '9876543210987654', STR_TO_DATE( '06/24','%m/%y'), '456', 'Avenida de Ejemplo, Pueblo Ejemplo'),
('cliente2', 'Cliente2 Apellido', '5555666677778888',STR_TO_DATE('09/23','%m/%y'), '789', 'Calle Principal, Villa Ejemplo');

create user if not exists uvacantes_2024 identified by 'uvacantes';
grant all privileges on vacantes_BBDD_2024_EXA.* to uvacantes_2024;

SELECT peliculas.*
FROM peliculas

JOIN tarifas  ON peliculas.id_tarifa = tarifas.id_tarifa
WHERE tarifas.nombre = 'Tarifa Basic';

SELECT peliculas.* FROM peliculas JOIN usuarios ON peliculas.id_tarifa = usuarios.id_tarifa WHERE usuarios.username = 'cliente2' AND (peliculas.id_tarifa = usuarios.id_tarifa OR (peliculas.id_tarifa <= usuarios.id_tarifa AND peliculas.id_tarifa >= 1));

SELECT peliculas.*
FROM peliculas
JOIN usuarios ON peliculas.id_tarifa <= usuarios.id_tarifa
WHERE usuarios.username = 'Xerixk';
