package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.StatutCandidature;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Candidat")
@Entity
public class CandidatEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nom")
	private String nom;

	@Column(name = "prenom", columnDefinition = "TEXT")
	private String prenom;

	@Column(name = "email")
	private String email;

	@Column (name ="telephone")
	private String telephone;

	@Column (name="date_naissance")
	private LocalDate dateNaissance;

	@Column (name ="adresse")
	private String adresse;

	@Column (name ="niveau_etude")
	private String niveauEtude;

	@Column(name = "niveau_statut_candidature")
	@Enumerated(EnumType.STRING)
	private StatutCandidature statutCandidature;

	@ManyToOne
	@JoinColumn(name = "recrutement_id")
	private RecrutementEntity recrutement;
}
