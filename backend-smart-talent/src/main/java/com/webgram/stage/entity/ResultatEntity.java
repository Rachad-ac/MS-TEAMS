package com.webgram.stage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@Table(name = "resultats")
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ResultatEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "note")
    private double note;
    @Column(name = "commentaire")
    private String commentaire;


    @ManyToOne
    @JoinColumn(name = "employe_id")
    private EmployeEntity employe;

    @ManyToOne
    @JoinColumn(name = "evaluation_id")
    private EvaluationEntity evaluation;



}
