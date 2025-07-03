package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.NiveauCompetence;
import com.webgram.stage.entity.enums.StatutFormation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "formations")
@Entity
public class FormationEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "formation_titre", length = 100)
	private String titre;

	@Lob
	@Column(name = "formation_description", columnDefinition = "TEXT")
	private String description;

	@Column(name = "formation_objectif", length = 100)
	private String objectif;

	@Temporal(TemporalType.DATE)
	@Column(name = "formation_date_debut")
	private LocalDate dateDebut;

	@Temporal(TemporalType.DATE)
	@Column(name = "formation_date_fin")
	private LocalDate dateFin;

	@Column(name = "formation_niveau")
	private NiveauCompetence niveau;

	@Column(name = "formation_statut")
	private StatutFormation statut;
}
