import { Component, OnInit } from '@angular/core';

// //Services
import { SessionService } from '../../../auth/services/session.service';

// //Models
import { AppUsuario } from '../../../models/dto/user/app-usuario';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrl: './full.component.css',
})
export class FullComponent implements OnInit {
  isCollapsed: boolean = false;
  user: AppUsuario | null;
  NombreUsuario?: string = '';

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.sessionService.currentUserValue;
    if (!this.user) {
      this.sessionService.logout();
    }
    this.NombreUsuario = this.user?.nombres;
  }

  ngOnInit(): void {

  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  closeSession(): void {
    this.sessionService.logout();
  }

}
