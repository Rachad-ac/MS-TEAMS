package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.StatutCandidature;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "candidature")
public class CandidatureEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCandidature;

    // Date et heure de la candidature
    private LocalDateTime dateCandidature;

    // Statut de la candidature (EN_ATTENTE, ACCEPTEE, REJETEE)
    @Enumerated(EnumType.STRING)
    private StatutCandidature statut;

    // Relation ManyToOne vers RecrutementEntity (chaque candidature concerne un recrutement)
    @ManyToOne
    @JoinColumn(name = "recrutement_id")
    private RecrutementEntity recrutement;

    // Relation ManyToOne vers CandidatEntity (chaque candidature est faite par un candidat)
    @ManyToOne
    @JoinColumn(name = "candidat_id")
    private CandidatEntity candidat;

    public Long getIdCandidature() { return idCandidature; }
    public void setIdCandidature(Long idCandidature) { this.idCandidature = idCandidature; }
    public LocalDateTime getDateCandidature() { return dateCandidature; }
    public void setDateCandidature(LocalDateTime dateCandidature) { this.dateCandidature = dateCandidature; }
    public StatutCandidature getStatut() { return statut; }
    public void setStatut(StatutCandidature statut) { this.statut = statut; }
    public RecrutementEntity getRecrutement() { return recrutement; }
    public void setRecrutement(RecrutementEntity recrutement) { this.recrutement = recrutement; }
    public CandidatEntity getCandidat() { return candidat; }
    public void setCandidat(CandidatEntity candidat) { this.candidat = candidat; }
} 