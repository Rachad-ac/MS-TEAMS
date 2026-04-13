package com.webgram.stage.entity;
import com.webgram.stage.entity.enums.StatutCandidature;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "candidats")
@Entity
public class CandidatEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nom")
	private String nom;

	@Column(name = "prenom", columnDefinition = "TEXT")
	private String prenom;

	@Column(name = "email" , unique = true)
	private String email;

	@Column (name ="telephone" , unique = true)
	private String telephone;

	@Column (name="date_naissance")
	private LocalDate dateNaissance;

	@Column (name ="adresse")
	private String adresse;

	@Column(name = "statut_candidature")
	@Enumerated(EnumType.STRING)
	private StatutCandidature statutCandidature;

	@ManyToOne
	@JoinColumn(name = "niveau_etude_id")
	private NiveauEtudeEntity niveauEtude;

	@ManyToMany
	@JoinTable(
		name = "competence_candidat",
			joinColumns = @JoinColumn(name="competence_id"),
			inverseJoinColumns = @JoinColumn(name = "candidat_id")
	)

    private Set<CompetenceEntity> competence;

	@ManyToOne
	@JoinColumn(name = "recrutement_id")
	private RecrutementEntity recrutement;
}
