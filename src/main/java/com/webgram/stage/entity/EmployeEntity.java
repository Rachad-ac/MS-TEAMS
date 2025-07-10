package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.DepartementType;
import com.webgram.stage.entity.enums.SexType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "employes")
@Entity
public class EmployeEntity implements Serializable {

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
    @Temporal(TemporalType.DATE)
    @Column(name = "date_embauche")
    private Date dateEmbauche;
    @Column(name = "role")
    private String role;
}
