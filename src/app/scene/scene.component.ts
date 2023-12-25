import {Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Input, ViewChild} from '@angular/core';
import {extend, injectBeforeRender, NgtArgs, NgtBeforeRenderEvent, NgtStore} from 'angular-three';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


extend(THREE);
extend({ OrbitControls });

@Component({
  selector: 'base',
  standalone: true,
  template: `
      <ngt-mesh #mesh>
          <ngt-sphere-geometry *args="[100, 16, 8]" />
          <ngt-mesh-basic-material [wireframe]="true" />

<!--          <ngt-mesh [position]="[0, 150, 0]">-->
<!--              <ngt-sphere-geometry *args="[50, 16, 8]" />-->
<!--              <ngt-mesh-basic-material color="#00ff00" [wireframe]="true" />-->
<!--          </ngt-mesh>-->
      </ngt-mesh>

  `,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Base {

  @ViewChild('cube', { static: true }) cube!: ElementRef<THREE.Mesh>;

}


@Component({
  selector: 'demo-cube',
  standalone: true,
  template: `
    <ngt-mesh
      (beforeRender)="onBeforeRender($any($event))"
      (click)="active = !active"
      (pointerover)="hovered = true"
      (pointerout)="hovered = false"
      [scale]="active ? 1.5 : 1"
      [position]="position"
      >
      <ngt-box-geometry />
      <ngt-mesh-standard-material [color]="hovered ? 'darkred' : 'red'" />
    </ngt-mesh>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Cube {
  @Input() position = [0, 0, 0];

  active = false;
  hovered = false;

  onBeforeRender(event: NgtBeforeRenderEvent<THREE.Mesh>) {
    event.object.rotation.x += 0.01;
  }
}

extend({ OrbitControls });
@Component({
  standalone: true,
  template: `
    <ngt-ambient-light [intensity]="0.5" />
    <ngt-spot-light [position]="10" [angle]="0.15" [penumbra]="1" />
    <ngt-point-light [position]="-10" />

    <demo-cube [position]="[1.5, 0, 0]" />
    <demo-cube [position]="[-1.5, 0, 0]" />
    <base/>
    <ngt-orbit-controls *args="[camera, glDom]" [enableDamping]="true" />

  `,
  imports: [Cube,Base,NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneComponent {
  private readonly store = inject(NgtStore);
  readonly camera = this.store.get('camera');
  readonly glDom = this.store.get('gl', 'domElement');
}
