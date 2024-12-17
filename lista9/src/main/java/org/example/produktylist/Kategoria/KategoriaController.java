package org.example.produktylist.Kategoria;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Controller
@RequestMapping("/kategoria")
public class KategoriaController {

    private final KategoriaService kategoriaService;

    public KategoriaController(KategoriaService kategoriaService) {
        this.kategoriaService = kategoriaService;
    }

    // Wyświetlanie listy kategorii
    @GetMapping("/")
    public String listKategorie(Model model) {
        List<Kategoria> kategorie = kategoriaService.getAllKategorie();
        model.addAttribute("kategorieList", kategorie); // Upewnij się, że używasz poprawnej nazwy atrybutu w widoku (kategorieList)
        return "kategoria/index";
    }


    // Dodawanie kategorii
    @GetMapping("/add")
    public String addKategoriaForm(Model model) {
        model.addAttribute("kategoria", new Kategoria());
        return "kategoria/add";
    }

    @PostMapping("/add")
    public String addKategoria(@ModelAttribute Kategoria kategoria) {
        kategoriaService.addKategoria(kategoria);
        return "redirect:/kategoria/"; // Zamiast przekierowywać do samej strony, zapewniamy, że załadowana zostanie lista.
    }


    // Edytowanie kategorii
    @GetMapping("/{kategoriaId}/edit")
    public String editKategoriaForm(@PathVariable Long kategoriaId, Model model) {
        Kategoria kategoria = kategoriaService.getKategoriaById(kategoriaId);
        model.addAttribute("kategoria", kategoria);
        return "kategoria/edit";
    }

    @PostMapping("/edit")
    public String editKategoria(@ModelAttribute Kategoria kategoria) {
        kategoriaService.updateKategoria(kategoria);
        return "redirect:/kategoria/";
    }

    // Szczegóły kategorii
    @GetMapping("/{kategoriaId}/details")
    public String kategoriaDetails(@PathVariable Long kategoriaId, Model model) {
        Kategoria kategoria = kategoriaService.getKategoriaById(kategoriaId);
        model.addAttribute("kategoria", kategoria);
        return "kategoria/details";
    }

    // Usuwanie kategorii
    @GetMapping("/{kategoriaId}/remove")
    public String removeKategoria(@PathVariable Long kategoriaId) {
        kategoriaService.deleteKategoriaById(kategoriaId);
        return "redirect:/kategoria/";
    }

}
