package org.example.produktylist;

import org.springframework.lang.NonNull;

public class Produkt {

    private long id;
    private String nazwa;
    private double waga;
    private double cena;




    public Produkt() {
        this.id = 0;
        this.nazwa = "";
        this.waga = 0.00;
        this.cena = 0.00;
    }


    public Produkt(long id, String nazwa, double waga, double cena) {
        this.id = id;
        this.nazwa = nazwa;
        this.waga = waga;
        this.cena = cena;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNazwa() {
        return nazwa;
    }

    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public double getWaga() {
        return waga;
    }

    public void setWaga(double waga) {
        this.waga = waga;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }


}
