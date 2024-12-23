import { Component, inject } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { SubscibeeCardComponent } from "./subscibee-card/subscibee-card.component";
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-saidbar',
  standalone: true,
  imports: [SvgIconComponent, CommonModule, SubscibeeCardComponent, RouterModule, AsyncPipe, ImgUrlPipe],
  templateUrl: './saidbar.component.html',
  styleUrl: './saidbar.component.scss'
})
export class SaidbarComponent {
  profileService = inject(ProfileService)

  subscripbers$ = this.profileService.getSubscribersShortList()
  me = this.profileService.me
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },

  ]
  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
