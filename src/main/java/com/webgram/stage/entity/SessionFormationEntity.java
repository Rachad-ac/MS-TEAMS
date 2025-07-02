package com.webgram.stage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "session_formations")
@Entity
public class SessionFormationEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "session_formation_lieu")
	private String lieu;

	@Temporal(TemporalType.DATE)
	@Column(name = "session_formation_date")
	private LocalDate date;

	@Temporal(TemporalType.TIME)
	@Column(name = "session_formation_heure_debut")
	private LocalTime heureDebut;

	@Temporal(TemporalType.TIME)
	@Column(name = "session_formation_heure_fin")
	private LocalTime heureFin;

	@ManyToOne
	@JoinColumn(name = "formation_id")
	private FormationEntity formation;
}
