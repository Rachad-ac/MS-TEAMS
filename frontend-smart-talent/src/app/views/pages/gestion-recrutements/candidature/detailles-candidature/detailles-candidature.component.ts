import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CandidatureService} from "../../../../../services/candidature/candidature.service";

@Component({
  selector: 'app-detailles-candidature',
  templateUrl: './detailles-candidature.component.html',
  styleUrls: ['./detailles-candidature.component.scss']
})
export class DetaillesCandidatureComponent implements OnInit {
  candidature: any; // Détail de la candidature à afficher
  candidatureId: any; // ID de la candidature à afficher

  constructor(
    private route: ActivatedRoute,
    private candidatureService: CandidatureService
  ) { }

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL et charge la candidature
    this.candidatureId = this.route.snapshot.params['id'];
    this.getCandidatureById();
  }

  /**
   * Récupère la candidature à afficher par son ID
   */
  getCandidatureById() {
    this.candidatureService.getCandidatureId(this.candidatureId).subscribe({
      next: (response) => {
        this.candidature = response.payload;
        console.log('Candidature:', this.candidature);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la candidature:', error);
      }
    });
  }
}
