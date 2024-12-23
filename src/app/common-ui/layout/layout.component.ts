import { ProfileService } from './../../data/services/profile.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaidbarComponent } from "../saidbar/saidbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SaidbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
