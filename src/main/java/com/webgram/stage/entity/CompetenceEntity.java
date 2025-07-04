package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.NiveauCompetence;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "competence")
@Entity
public class CompetenceEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nom_competence")
	private String nom;

	@Column(name = "niveau")
	@Enumerated(EnumType.STRING)
	private NiveauCompetence niveau;

	@Column(name = "domaine_competence")
	private String domaine;
}
