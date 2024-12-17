package org.example.produktylist.Produkt;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduktService {
    private final ProduktRepository produktRepository;

    public ProduktService(ProduktRepository produktRepository) {
        this.produktRepository = produktRepository;
    }

    public List<Produkt> getAllProdukty() {
        return produktRepository.findAll();
    }

    public void addProdukt(Produkt produkt) {
        produktRepository.save(produkt);
    }

    public Produkt getProduktById(Long id) {
        return produktRepository.findById(id).orElse(null);
    }

    public void updateProdukt(Produkt produkt) {
        produktRepository.save(produkt);
    }

    public void deleteProduktById(Long id) {
        produktRepository.deleteById(id);
    }
}
