import { Camera, Euler, Object3D, PerspectiveCamera, Quaternion, Vector3 } from "three";
import { maxSize } from "../util/aspect"

export class CameraMover extends Object3D {

  rotationScale: number = 5;
  readonly camera: Camera;

  constructor(camera: Camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000), rotScale: number = 5) {

    super();
    this.rotationScale = rotScale;
    this.camera = camera;
    this.add(this.camera);

  }

  onMouseMove(mouseX: number, mouseY: number) {

    // TODO: fix this (it's so jank)
    const yPos = (mouseY / maxSize - .5) * 2;
    const xPos = (mouseX / maxSize - .5) * 2;
    this.camera.setRotationFromEuler(new Euler(yPos * this.rotationScale, xPos * this.rotationScale, 0))

  }

}