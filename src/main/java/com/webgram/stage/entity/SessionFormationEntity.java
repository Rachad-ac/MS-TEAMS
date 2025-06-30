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
@Table(name = "session_formations")
@Entity
public class SessionFormationEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Temporal(TemporalType.DATE)
	@Column(name = "session_formation_date_debut")
	private LocalDate dateDebut;

	@Temporal(TemporalType.DATE)
	@Column(name = "session_formation_date_fin")
	private LocalDate dateFin;

	@Column(name = "session_formation_lieu")
	private String lieu;

	@Column(name = "session_formation_nombre_places")
	private Long nombrePlaces;


}
