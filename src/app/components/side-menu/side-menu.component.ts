import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu-service/menu.service';
import { IMenu } from '../../Models/menuModels';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  standalone: true
})
export class SideMenuComponent implements OnInit {
public menus$:Observable<IMenu[]>| null = null;

  constructor(private readonly _menuService: MenuService) { }
  ngOnInit(): void {
    this.menus$ = this._menuService.getMenu();
  }


}
