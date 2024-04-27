package com.grupo8.digitalbooking.service;

import com.grupo8.digitalbooking.model.Imagen;
import com.grupo8.digitalbooking.model.Producto;
import com.grupo8.digitalbooking.repository.ImagenRepository;
import com.grupo8.digitalbooking.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class ImagenService {
    private static final Logger logger = LoggerFactory.getLogger(ImagenService.class);
    private final ImagenRepository imagenRepository;
    private final ProductoRepository productoRepository;

    @Autowired
    public ImagenService(ImagenRepository imagenRepository, ProductoRepository productoRepository) {
        this.imagenRepository = imagenRepository;
        this.productoRepository = productoRepository;
    }

    //Agregar imagen
    public Imagen agregarImagen(Imagen imagen){
        Optional<Producto> producto = productoRepository.findById(imagen.getProducto().getId());
        imagen.setProducto(producto.get());
        return imagenRepository.save(imagen);
    }

    //Buscar imagen
    public Optional<Imagen> buscarImagen(Integer id){
        return imagenRepository.findById(id);
    }

    //actualizar imagen
    public Imagen actualizarImagen(Imagen imagen){
        Optional<Producto> producto = productoRepository.findById(imagen.getProducto().getId());
        imagen.setProducto(producto.get());
        return imagenRepository.save(imagen);
    }

    //eliminar imagen
    public void eliminarImagen (Integer id) throws Exception {
        Optional<Imagen> imagenBuscada = buscarImagen(id);
        if (imagenBuscada.isPresent())
            imagenRepository.deleteById(id);
        else
            throw new Exception("Imágen no encontrada");
    }


    public List<Imagen> obtenerImagenesPorIdProducto(Integer productId) {
        List<Imagen> imagenes = imagenRepository.findByProductoId(productId);
        return imagenes;
    }

    //traer todas las imagenes
    public List<Imagen> listarImagenes(){
        logger.info("Iniciando el método listarImagenes()");
        List<Imagen>imagenes= imagenRepository.findAll();
        logger.info("Número de imágenes encontradas: {}", imagenes.size());
        return imagenes;
    }
}
