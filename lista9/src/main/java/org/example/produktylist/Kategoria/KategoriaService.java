package org.example.produktylist.Kategoria;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KategoriaService {
    private final KategoriaRepository kategoriaRepository;

    public KategoriaService(KategoriaRepository kategoriaRepository) {
        this.kategoriaRepository = kategoriaRepository;
    }

    public List<Kategoria> getAllKategorie() {
        return kategoriaRepository.findAll();
    }

    public void addKategoria(Kategoria kategoria) {
        kategoriaRepository.save(kategoria);
    }

    public Kategoria getKategoriaById(Long id) {
        return kategoriaRepository.findById(id).orElse(null);
    }

    public void updateKategoria(Kategoria kategoria) {
        kategoriaRepository.save(kategoria);
    }

    public void deleteKategoriaById(Long id) {
        Kategoria kategoria = kategoriaRepository.findById(id).orElse(null);
        if (kategoria != null) {
            kategoria.getProdukty().clear();
            kategoriaRepository.save(kategoria);
            kategoriaRepository.delete(kategoria);
        }
    }


}
