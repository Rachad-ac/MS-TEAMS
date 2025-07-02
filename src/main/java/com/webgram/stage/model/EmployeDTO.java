package com.webgram.stage.model;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO pour transférer les données d'un employé sans exposer l'entité JPA.
 */
public class EmployeDTO {
    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    private String departement;
    private String poste;
    private LocalDate dateEmbauche;
    // On peut ajouter des listes d'IDs pour les relations si besoin
    private List<Integer> inscriptionIds;
    // ====== RELATIONS COMMENTÉES EN ATTENDANT LA CRÉATION DES ENTITÉS ======
    /*
    private List<Integer> presenceIds;
    private List<Integer> resultatIds;
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
    public List<Integer> getInscriptionIds() { return inscriptionIds; }
    public void setInscriptionIds(List<Integer> inscriptionIds) { this.inscriptionIds = inscriptionIds; }
    /*
    public List<Integer> getPresenceIds() { return presenceIds; }
    public void setPresenceIds(List<Integer> presenceIds) { this.presenceIds = presenceIds; }
    public List<Integer> getResultatIds() { return resultatIds; }
    public void setResultatIds(List<Integer> resultatIds) { this.resultatIds = resultatIds; }
    */
} 