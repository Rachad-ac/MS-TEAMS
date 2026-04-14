package com.webgram.stage.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Test")
@Entity
public class TestEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column (name = "date")
    private LocalDate date;

    @Column(name = "bareme")
    private Integer bareme;


    @ManyToOne
    @JoinColumn(name = "formation_id",nullable = false)
    private FormationEntity formation;
}
