package org.example.produktylist;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProduktService {

    ArrayList<Produkt> produktList=new ArrayList<>();

    public ProduktService() {
    }

    public void seed(){
        produktList.add(new Produkt(1,"Mleko",1,2.50));
        produktList.add(new Produkt(2,"Chleb",0.5,3.50));
        produktList.add(new Produkt(3,"Masło",0.2,5.50));
    }

    private boolean isEmpty() {
        return produktList.isEmpty();
    }

    public List<Produkt> getAllProdukt() {
        return produktList;
    }

    public void addProdukt(Produkt produkt) {
        produktList.add(produkt);
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
