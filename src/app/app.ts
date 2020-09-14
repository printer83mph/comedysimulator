import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class App {

  canvas: HTMLCanvasElement

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement
  });

  constructor() {
    window.addEventListener("resize", () => this.resizeCanvas());
    this.resizeCanvas();
  }

  private resizeCanvas() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

}