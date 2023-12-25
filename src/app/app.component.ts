import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NgtCanvas} from "angular-three";
import {SceneComponent} from "./scene/scene.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgtCanvas],
  template: `<ngt-canvas [sceneGraph]="SceneGraph" />`,
})
export class AppComponent {
  title = 'rpgthreeng';

  readonly SceneGraph = SceneComponent;
}
