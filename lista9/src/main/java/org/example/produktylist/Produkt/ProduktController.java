package org.example.produktylist.Produkt;

import org.example.produktylist.Produkt.Produkt;
import org.example.produktylist.Kategoria.Kategoria;
import org.example.produktylist.Produkt.ProduktService;
import org.example.produktylist.Kategoria.KategoriaService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/produkt")
public class ProduktController {

    private final ProduktService produktService;
    private final KategoriaService kategoriaService;

    public ProduktController(ProduktService produktService, KategoriaService kategoriaService) {
        this.produktService = produktService;
        this.kategoriaService = kategoriaService;
    }

    // Wyświetlanie listy produktów
    @GetMapping("/")
    public String listProdukty(Model model) {
        List<Produkt> produktList = produktService.getAllProdukty();
        model.addAttribute("produktList", produktList);
        return "produkt/index";
    }

    // Dodawanie produktu
    @GetMapping("/add")
    public String addProdukt(Model model) {
        model.addAttribute("produkt", new Produkt());
        model.addAttribute("kategorieList", kategoriaService.getAllKategorie()); // Poprawiona nazwa atrybutu
        return "produkt/add";
    }

    @PostMapping("/add")
    public String addProdukt(@ModelAttribute Produkt produkt) {
        produktService.addProdukt(produkt);
        return "redirect:/produkt/";
    }

    // Edytowanie produktu
    @GetMapping("/{produktId}/edit")
    public String editProdukt(@PathVariable Long produktId, Model model) {
        model.addAttribute("produkt", produktService.getProduktById(produktId));
        model.addAttribute("kategorie", kategoriaService.getAllKategorie());
        return "produkt/edit";
    }

    @PostMapping("/edit")
    public String editProdukt(@ModelAttribute Produkt produkt) {
        produktService.updateProdukt(produkt);
        return "redirect:/produkt/";
    }

    // Szczegóły produktu
    @GetMapping("/{produktId}/details")
    public String produktDetails(@PathVariable Long produktId, Model model) {
        model.addAttribute("produkt", produktService.getProduktById(produktId));
        return "produkt/details";
    }

    // Usuwanie produktu
    @GetMapping("/{produktId}/remove")
    public String removeProdukt(@PathVariable Long produktId) {
        produktService.deleteProduktById(produktId);
        return "redirect:/produkt/";
    }
}