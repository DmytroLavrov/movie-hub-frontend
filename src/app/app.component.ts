import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UiService } from './core/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isMenuOpen$!: Observable<boolean>;

  constructor(
    private router: Router,
    private uiService: UiService,
  ) {}

  ngOnInit(): void {
    this.isMenuOpen$ = this.uiService.isMenuOpen$;

    this.router.events.subscribe(() => {
      this.closeMenuOnNavigation();
    });
  }

  public toggleMenu(): void {
    this.uiService.toggleMenu();
  }

  public closeMenuOnNavigation(): void {
    this.uiService.setMenuOpen(false);
  }

  public goToSearchPage(): void {
    this.router.navigate(['/movies']);
  }
}
