import { Camera, Euler, Object3D, PerspectiveCamera, Quaternion, Vector3 } from "three";

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

    this.camera.setRotationFromEuler(new Euler(-(mouseY / innerHeight - .5) * this.rotationScale, -(mouseX / innerHeight - .5) * this.rotationScale, 0))

  }

}