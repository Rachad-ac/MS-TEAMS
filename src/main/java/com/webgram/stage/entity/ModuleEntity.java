package com.webgram.stage.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Module")
@Entity
public class ModuleEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre")
    private String titre;

    @Column (name = "ordre")
    private Integer ordre;

    // @ManyToOne(fetch = FetchType.LAZY, optional = false)
    //@JoinColumn(name = "formation_id", nullable = false)
    // private FormationEntity formation;

}
