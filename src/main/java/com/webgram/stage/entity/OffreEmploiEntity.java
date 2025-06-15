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
@Table(name = "offreEmplois")
@Entity
public class OffreEmploiEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "offreEmploi_titre")
	private String titre;

	@Lob
	@Column(name = "offreEmploi_description", columnDefinition = "TEXT")
	private String description;

	@Temporal(TemporalType.DATE)
	@Column(name = "offreEmploi_date_publication")
	private LocalDate datePublication;
}
