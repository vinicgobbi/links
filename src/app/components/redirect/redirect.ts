import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../../services/data';
import { Link } from '../../models/link';

@Component({
  selector: 'app-redirect',
  imports: [],
  templateUrl: './redirect.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './redirect.css'
})
export class Redirect implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: Data
  ) { }

  ngOnInit(): void {
    const alias = this.route.snapshot.paramMap.get('alias')?.toLowerCase().trim() ?? '';

    this.dataService.getLinks().subscribe({
      next: (links: Link[]) => {
        const match = links.find(link =>
          link.name.toLowerCase() === alias ||
          link.alias?.some(a => a.toLowerCase() === alias)
        );

        if (match) {
          window.location.href = match.link;
        } else {
          this.router.navigate(['/']);
        }
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
