import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { SvgIconComponent } from "../../common-ui/svg-icon/svg-icon.component";
import { NgModel } from '@angular/forms';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostInputComponent } from "./post-input/post-input.component";
import { PostFeedComponent } from "./post-feed/post-feed.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, CommonModule, ImgUrlPipe, PostFeedComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  me$ = toObservable(this.profileService.me)
  subscripbers$ = this.profileService.getSubscribersShortList(5)


  profile$ = this.route.params
    .pipe(
      switchMap(({ id }) => {
        if (id === 'me') return this.me$
        return this.profileService.getAccount(id)
      })
    )
}
