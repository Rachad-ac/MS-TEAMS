import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from 'src/app/services/employe/employe.service';

@Component({
  selector: 'app-detailles-employe',
  templateUrl: './detailles-employe.component.html',
  styleUrls: ['./detailles-employe.component.scss']
})
export class DetaillesEmployeComponent implements OnInit {
  employe: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private employeService: EmployeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeService.getEmployeById(+id).subscribe({
        next: (data) => {
          this.employe = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
}
