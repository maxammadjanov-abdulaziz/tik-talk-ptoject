import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-subscibee-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './subscibee-card.component.html',
  styleUrl: './subscibee-card.component.scss'
})
export class SubscibeeCardComponent {
  @Input() profile!: Profile
}
