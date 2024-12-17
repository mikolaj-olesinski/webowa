package org.example.produktylist.Kategoria;

import lombok.*;
import org.example.produktylist.Produkt.Produkt;

import javax.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Kategoria {
    @Id
    private long id;

    private String name;


    @OneToMany(mappedBy = "kategoria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produkt> produkty = new ArrayList<>();


}
