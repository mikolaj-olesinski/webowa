package org.example.produktylist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;


@Controller
public class ProduktController {

    private final ProduktService produktService;

    public ProduktController(ProduktService produktService) {
        this.produktService = produktService;
    }

    @GetMapping("/produkt/")
    public String home(Locale locale, Model model) {
        List<Produkt> produktList = produktService.getAllProdukt();
        model.addAttribute("produktList", produktList );
        return "produkt/index";
    }

    @GetMapping("/produkt/seed")
    public String seed() {
        produktService.seed();
        return "redirect:/produkt/";
    }


    @GetMapping("/produkt/add")
    public String add(Model model) {
        model.addAttribute("produkt", new Produkt() );
        return "produkt/add";
    }

    @PostMapping("/produkt/add")
    public String add(@ModelAttribute Produkt produkt) {
        produktService.addProdukt(produkt);
        return "redirect:/produkt/";
    }


    @GetMapping("/produkt/details")
    public String add(@RequestParam("id") long inputId, Model model) {
        model.addAttribute("produkt", produktService.getProduktById(inputId) );
        return "/produkt/details";
    }

    @GetMapping(value = {"/produkt/{prodId}/edit"})
    public String edit(Model model, @PathVariable Integer prodId) {
        model.addAttribute("produkt", produktService.getProduktById(prodId) );
        return "/produkt/edit";
    }

    @PostMapping(value = {"/produkt/edit"})
    public String edit(@ModelAttribute Produkt produkt) {
        produktService.updateProdukt(produkt);
        return "redirect:/produkt/";
    }

    @GetMapping("/produkt/remove")
    public String remove(@RequestParam("id") long id) {
        produktService.deleteProduktById(id);
        return "redirect:/produkt/";
    }
}
