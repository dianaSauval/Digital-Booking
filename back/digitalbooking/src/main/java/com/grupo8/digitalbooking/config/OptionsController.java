package com.grupo8.digitalbooking.config;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OptionsController {

    @RequestMapping(value = "/**", method = RequestMethod.OPTIONS)
    public void handleOptions() {
        // No es necesario hacer nada aquí, simplemente devolver una respuesta exitosa.
    }
}
