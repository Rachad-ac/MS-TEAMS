package com.webgram.stage.entity;

import com.webgram.stage.entity.enums.PresenceType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "presences")
@Entity
public class PresenceEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "statut_presence")
    private PresenceType statutPresence;
    @Column(name = "justification" , nullable = true)
    private String justification;

    /*
    @ManyToOne
    @JoinColumn(name = "employe_id")
    private EmployeEntity employe;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private SessionFormationEntity sessionFormation;

     */

}
