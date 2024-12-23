import { ProfileService } from './../../data/services/profile.service';
import { Component, inject } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";


@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []

  constructor() {
    this.profileService.getTestAccounts().subscribe((val) => {
      if (val) {
        this.profiles = Array.isArray(val) ? val : [val]; // Оборачиваем в массив, если нужно
      } else {
        this.profiles = [];
      }
    })
  }
}
