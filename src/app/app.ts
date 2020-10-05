import { ACESFilmicToneMapping, Clock, EquirectangularReflectionMapping, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from "three";
import { CameraMover } from "./models/cameraMover"
import * as Aspect from "./util/aspect"
import QuoteGenerator from "./models/quoteGenerator"

// @ts-ignore
import SpaceHDRI from "./res/space_hdri.png";
import { Stage } from "./models/stage";

export class App {

  canvas: HTMLCanvasElement

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 10000);
  private readonly cameraMover = new CameraMover(this.camera, 2);
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

  private onClick(event: MouseEvent) {
    QuoteGenerator.makeQuote();
  }

  // UTIL

  constructor() {
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("main-canvas") as HTMLCanvasElement
    });

    window.addEventListener("resize", () => this.onResize());
    window.addEventListener("mousemove", (e: MouseEvent) => this.onMouseMove(e));
    window.addEventListener("click", (e: MouseEvent) => this.onClick(e));

    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.physicallyCorrectLights = true;

    this.onResize();
    this.setup();
    this.render();
  }

  private onResize() {
    Aspect.onResize();
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
