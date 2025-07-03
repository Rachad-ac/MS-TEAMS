package com.webgram.stage.model;

import java.time.LocalDateTime;

/**
 * DTO pour transférer les données d'une inscription sans exposer l'entité JPA.
 */
public class InscriptionDTO {
    private Integer id;
    private Integer employeId; // ID de l'employé inscrit
    private Integer formationId; // ID de la formation concernée
    private LocalDateTime dateInscription;
    private String statut;

    // Getters et setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getEmployeId() { return employeId; }
    public void setEmployeId(Integer employeId) { this.employeId = employeId; }
    public Integer getFormationId() { return formationId; }
    public void setFormationId(Integer formationId) { this.formationId = formationId; }
    public LocalDateTime getDateInscription() { return dateInscription; }
    public void setDateInscription(LocalDateTime dateInscription) { this.dateInscription = dateInscription; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
} 