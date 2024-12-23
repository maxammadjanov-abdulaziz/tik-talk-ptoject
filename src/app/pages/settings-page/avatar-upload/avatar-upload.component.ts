import { Component, signal } from '@angular/core';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>('/assets/img/content-avater.png')

  avatar: File | null = null

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.proccesFile(file)
  }
  onFileDroped(file: File) {
    this.proccesFile(file)

  }

  proccesFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return
    const reader = new FileReader()
    reader.onload = event => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
  }
}
