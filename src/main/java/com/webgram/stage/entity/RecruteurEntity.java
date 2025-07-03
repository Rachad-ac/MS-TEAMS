package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.DepartementType;
import com.webgram.stage.entity.enums.EvaluationType;
import com.webgram.stage.entity.enums.SexType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "recruteurs")
@Entity
public class RecruteurEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;
    @Column(name = "prenom")
    private String prenom;
    @Column(name = "email" , unique = true)
    private String email;
    @Column(name = "telephone" , unique = true)
    private String telephone;
    @Column(name = "poste")
    private String poste;
    @Enumerated(EnumType.STRING)
    @Column(name = "departement")
    private DepartementType departement;
    @Enumerated(EnumType.STRING)
    @Column(name = "sexe")
    private SexType sexe;

    @OneToMany(mappedBy = "recruteur" , cascade = CascadeType.ALL)
    private List<EvaluationEntity> evaluation;
}
