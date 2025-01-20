import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class NavbarComponent {

  constructor(private readonly _router: Router) { }
  public onLogoClick(): void {
    this._router.navigate(['/home']);
  }
}
