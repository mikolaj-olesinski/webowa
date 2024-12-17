package org.example.produktylist;

import org.springframework.lang.NonNull;

public class Produkt {

    private long id;
    private String nazwa;
    private Double waga;
    private Double cena;
    private String kategoria;
    private String zdjecieUrl;




    public Produkt() {
    }


    public Produkt(long id, String nazwa, Double waga, Double cena, String kategoria, String zdjecieUrl) {
        this.id = id;
        this.nazwa = nazwa;
        this.waga = waga;
        this.cena = cena;
        this.kategoria = kategoria;
        this.zdjecieUrl = zdjecieUrl;
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

    public Double getWaga() {
        return waga;
    }

    public void setWaga(Double waga) {
        this.waga = waga;
    }

    public Double getCena() {
        return cena;
    }

    public void setCena(Double cena) {
        this.cena = cena;
    }

    public String getKategoria() {
        return kategoria;
    }

    public void setKategoria(String kategoria) {
        this.kategoria = kategoria;
    }

    public String getZdjecieUrl() {
        return zdjecieUrl;
    }

    public void setZdjecieUrl(String zdjecieUrl) {
        this.zdjecieUrl = zdjecieUrl;
    }


}
