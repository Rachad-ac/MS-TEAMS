package com.webgram.stage.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * Entité représentant un employé dans le système de gestion de formation.
 */
@Entity
@Table(name = "employe")
public class EmployeEntity {
    /**
     * Identifiant unique de l'employé (clé primaire).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /** Nom de l'employé */
    private String nom;

    /** Prénom de l'employé */
    private String prenom;

    /** Email de l'employé */
    private String email;

    /** Département de l'employé */
    private String departement;

    /** Poste occupé par l'employé */
    private String poste;

    /** Date d'embauche de l'employé */
    private LocalDate dateEmbauche;

    /**
     * Liste des inscriptions de l'employé (relation OneToMany).
     * Un employé peut avoir plusieurs inscriptions à des formations.
     */
    @OneToMany(mappedBy = "employe")
    private List<InscriptionEntity> inscriptions;

    // ====== RELATIONS COMMENTÉES EN ATTENDANT LA CRÉATION DES ENTITÉS ======
    /*
    @OneToMany(mappedBy = "employe")
    private List<PresenceEntity> presences;

    @OneToMany(mappedBy = "employe")
    private List<ResultatEntity> resultats;

    public List<PresenceEntity> getPresences() { return presences; }
    public void setPresences(List<PresenceEntity> presences) { this.presences = presences; }
    public List<ResultatEntity> getResultats() { return resultats; }
    public void setResultats(List<ResultatEntity> resultats) { this.resultats = resultats; }
    */

    // Getters et setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartement() { return departement; }
    public void setDepartement(String departement) { this.departement = departement; }
    public String getPoste() { return poste; }
    public void setPoste(String poste) { this.poste = poste; }
    public LocalDate getDateEmbauche() { return dateEmbauche; }
    public void setDateEmbauche(LocalDate dateEmbauche) { this.dateEmbauche = dateEmbauche; }
    public List<InscriptionEntity> getInscriptions() { return inscriptions; }
    public void setInscriptions(List<InscriptionEntity> inscriptions) { this.inscriptions = inscriptions; }
} 