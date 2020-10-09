import {
  ACESFilmicToneMapping,
  Clock,
  EquirectangularReflectionMapping,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  WebGLRenderer
} from "three";
// import CameraMover from "./models/cameraMover"
import * as Aspect from "./util/aspect"

// @ts-ignore
import SpaceHDRI from "./res/space_hdri.png";
import { Stage } from "./models/stage";
import CameraSwitcher from "./models/cameraSwitcher";

// noinspection JSMethodCanBeStatic
export class App {

  canvas: HTMLCanvasElement

  private readonly scene = new Scene();
  private cameraSwitcher: CameraSwitcher;
  private readonly renderer: WebGLRenderer;

  private readonly dtTracker = new Clock();


  private setup() {
    this.scene.background = new TextureLoader().load(SpaceHDRI, (tex) => {tex.mapping = EquirectangularReflectionMapping});

    new Stage(this.scene, ( gltfScene ) => {
      this.cameraSwitcher = new CameraSwitcher(gltfScene, "WideCam");
    });
    // this.cameraMover.setRotationFromEuler(new Euler(0,0,0));
  }

  private update(dt: number) {
    // console.log(`DT is ${dt}`);
  }

  private onMouseMove(event: MouseEvent) {
    // this.cameraMover.onMouseMove(event.x, event.y);
  }

  private onClick(event: MouseEvent) {
    fetch("/joke")
        .then(response => response.json())
        .then(json => console.log(json))
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
    if (!this.cameraSwitcher) return;
    if (this.cameraSwitcher.currentCamera instanceof PerspectiveCamera) {
      this.cameraSwitcher.currentCamera.aspect = innerWidth / innerHeight;
      this.cameraSwitcher.currentCamera.updateProjectionMatrix();
    }
  }

  private render() {
    requestAnimationFrame(() => this.render());
    this.update(this.dtTracker.getDelta());
    if (!this.cameraSwitcher) return;
    this.renderer.render(this.scene, this.cameraSwitcher.currentCamera);
  }

}
