import { Clock, EquirectangularReflectionMapping, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer, Euler } from "three";
import { CameraMover } from "./models/cameraMover"
import { onResize as aspectResize } from "./util/aspect"

// @ts-ignore
import SpaceHDRI from "./res/space_hdri.png";
import { Stage } from "./models/stage";

export class App {

  canvas: HTMLCanvasElement

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10000);
  private readonly cameraMover = new CameraMover(this.camera);
  private readonly renderer: WebGLRenderer;

  private readonly dtTracker = new Clock();


  private setup() {
    this.scene.background = new TextureLoader().load(SpaceHDRI, (tex) => {tex.mapping = EquirectangularReflectionMapping});
    this.cameraMover.rotation.set(90 * Math.PI / 180, 0, 0);
    this.cameraMover.position.set(0, 1.7, 0);

    this.scene.add(this.cameraMover);
    new Stage(this.scene);
    // this.cameraMover.setRotationFromEuler(new Euler(0,0,0));
  }

  private update(dt: number) {
    // console.log(`DT is ${dt}`);
  }

  private onMouseMove(event: MouseEvent) {
    this.cameraMover.onMouseMove(event.x, event.y);
  }

  // UTIL

  constructor() {
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("main-canvas") as HTMLCanvasElement
    });

    window.addEventListener("resize", () => this.onResize());
    window.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e))

    this.onResize();
    this.setup();
    this.render();
  }

  private onResize() {
    aspectResize();
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    requestAnimationFrame(() => this.render());
    this.update(this.dtTracker.getDelta());
    this.renderer.render(this.scene, this.camera);
  }

}
