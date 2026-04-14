package com.webgram.stage.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "niveau_etude")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NiveauEtudeEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(length = 1000)
    private String commentaire;
}
