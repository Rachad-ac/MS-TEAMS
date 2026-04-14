package com.webgram.stage.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entité représentant une inscription d'un employé à une formation.
 */
@Entity
@Table(name = "inscription")
public class InscriptionEntity {
    /**
     * Identifiant unique de l'inscription (clé primaire).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Employé concerné par l'inscription (relation ManyToOne).
     * Plusieurs inscriptions peuvent concerner le même employé.
     */
    @ManyToOne
    @JoinColumn(name = "employe_id")
    private EmployeEntity employe;

    /**
     * Formation concernée par l'inscription (relation ManyToOne).
     * Plusieurs inscriptions peuvent concerner la même formation.
     *
     * ====== RELATION AVEC FormationEntity COMMENTÉE EN ATTENDANT SA CRÉATION ======
     *
     * @ManyToOne
     * @JoinColumn(name = "formation_id")
     * private FormationEntity formation;
     *
     * public FormationEntity getFormation() { return formation; }
     * public void setFormation(FormationEntity formation) { this.formation = formation; }
     */

    /** Date et heure de l'inscription */
    private LocalDateTime dateInscription;

    /** Statut de l'inscription (ex: validée, en attente, etc.) */
    private String statut;

    // Getters et setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public EmployeEntity getEmploye() { return employe; }
    public void setEmploye(EmployeEntity employe) { this.employe = employe; }
    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
} 