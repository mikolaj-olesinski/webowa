package org.example.produktylist;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProduktService {

    ArrayList<Produkt> produktList=new ArrayList<>();
    ArrayList<String> kategorie = new ArrayList<>();

    public ProduktService() {
    }

    public void seed() {
        kategorie.add("Spożywcze");
        kategorie.add("AGD");
        kategorie.add("Elektronika");
        produktList.add(new Produkt(1, "Mleko", 1.00, 2.50, "Spożywcze", "/images/mleko.jpg"));
        produktList.add(new Produkt(2, "Chleb", 0.50, 3.50, "Spożywcze", "/images/chleb.jpg"));
        produktList.add(new Produkt(3, "Masło", 0.20, 5.50, "Spożywcze", "/images/maslo.jpg"));
    }

    private boolean isEmpty() {
        return produktList.isEmpty();
    }

    public List<Produkt> getAllProdukt() {
        return produktList;
    }

    public List<String> getKategorie() {
        return kategorie;
    }

    public void addProdukt(Produkt produkt) {
        produktList.add(produkt);
    }

    public void addKategoria(String kategoria) {
        if (!kategorie.contains(kategoria)) {
            kategorie.add(kategoria);
        }
    }

    public Produkt getProduktById(long id) {
        for(Produkt produkt:produktList){
            if(produkt.getId()==id)
                return produkt;
        }
        return null;
    }
    public Produkt getProdukt(Produkt produkt){
        return getProduktById(produkt.getId());
    }
    public void updateProdukt(Produkt produkt) {
        deleteProdukt(produkt);
        produktList.add(produkt);
    }
    public void deleteProdukt(Produkt produkt) {
        produktList.remove(getProduktById(produkt.getId()));
    }
    public void deleteProduktById(long id) {
        produktList.remove(getProduktById(id));
    }
}
