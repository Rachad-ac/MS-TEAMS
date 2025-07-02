package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.EvaluationType;
import com.webgram.stage.entity.enums.StatutType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Table(name = "evalutions")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class EvaluationEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_evaluation")
    private EvaluationType type;
    @Column(name = "score_evaluation")
    private double score;
    @Column(name = "note_generale")
    private double noteGenerale;
    @Column(name = "commentaire")
    private String commentaire;
    @Column(name = "date_evaluation")
    private LocalDateTime dateEvaluation;
    @Enumerated(EnumType.STRING)
    @Column(name = "status_evalution")
    private StatutType statut;
    @Column(name = "recruteur")
    private String nomRecruteur;


    @ManyToOne
    @JoinColumn(name = "candidature_id", nullable = false)
    private CandidatureEntity candidature;

    @ManyToOne
    @JoinColumn(name = "recrutement_id", nullable = false)
    private RecrutementEntity recrutement;

    @ManyToOne
    @JoinColumn(name = "candidat_id", nullable = false)
    private CandidatEntity candidat;


    @ManyToOne
    @JoinColumn(name = "recruteur_id", nullable = false)
    private RecruteurEntity recruteur;
    


}
