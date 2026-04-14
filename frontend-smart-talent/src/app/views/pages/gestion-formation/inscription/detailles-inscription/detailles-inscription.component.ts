import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from 'src/app/services/inscription/inscription.service';

@Component({
  selector: 'app-detailles-inscription',
  templateUrl: './detailles-inscription.component.html',
  styleUrls: ['./detailles-inscription.component.scss']
})
export class DetaillesInscriptionComponent implements OnInit {
  inscription: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inscriptionService.getInscriptionById(+id).subscribe({
        next: (data) => {
          this.inscription = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}
