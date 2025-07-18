package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.TypeContrat;
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
@Table(name = "recrutements")
@Entity
public class RecrutementEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "recrutement_titre", length = 100)
	private String titre;

	@Lob
	@Column(name = "recrutement_description", columnDefinition = "TEXT")
	private String description;

	@Temporal(TemporalType.DATE)
	@Column(name = "recrutement_date_limite")
	private LocalDate dateLimite;

	@Column(name = "recrutement_lieu", length = 100)
	private String lieu;

	@Column(name = "recrutement_type_contrat")
	@Enumerated(EnumType.STRING)
	private TypeContrat typeContrat;

	@Column(name = "recrutement_salaire")
	private Double salaire;

	@OneToOne
	private DomaineEntity domaine;

	@Column(name = "recrutement_publier")
	private Boolean publier;

	@ManyToMany
	@JoinTable(
			name = "competence_recrutement",
			joinColumns = @JoinColumn(name = "competence_id"),
			inverseJoinColumns = @JoinColumn(name = "recrutement_id")
	)
	private Set<CompetenceEntity> competences;
}
