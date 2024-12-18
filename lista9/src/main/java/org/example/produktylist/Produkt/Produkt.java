package org.example.produktylist.Produkt;

import lombok.*;
import org.example.produktylist.Kategoria.Kategoria;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produkt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private double weight;
    private double price;

    @ManyToOne
    @JoinColumn(name = "kategoria_id", nullable = false)
    private Kategoria kategoria;
}