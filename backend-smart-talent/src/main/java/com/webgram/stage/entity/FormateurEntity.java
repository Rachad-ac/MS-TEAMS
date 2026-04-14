package com.webgram.stage.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.type.descriptor.jdbc.VarcharJdbcType;
import org.w3c.dom.Text;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "session_formations")
@Entity
public class FormateurEntity implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "Nom")
	private String nom;
	@Column(name = "Prenom")
	private String prenom;

	@Column(name = "Email")
	private String email;

	@Column(name = "Type")
	private String type;

	@Column(name = "Specialites")
	private String specialites;


}
