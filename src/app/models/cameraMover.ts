import { Camera, Euler, Object3D, PerspectiveCamera } from "three";
// import { maxSize } from "../util/aspect"

class CameraMover extends Object3D {

  constructor(
    public readonly camera: Camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000),
    public rotationScale: number = .05,
    public positionScale: number = .35
    ) {

    super();
    this.add(this.camera);

  }

  onMouseMove(mouseX: number, mouseY: number) {

    // TODO: fix this (it's so jank)
    const yPos = (mouseY / innerHeight - .5) * 2;
    const xPos = (mouseX / innerWidth - .5) * 2;
    this.camera.setRotationFromEuler(new Euler(yPos * this.rotationScale, xPos * this.rotationScale, 0));
    this.camera.position.set(xPos * this.positionScale, yPos * this.positionScale, 0);

  }

}

export default CameraMover