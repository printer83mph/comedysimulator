import {AmbientLight, Color, DirectionalLight, Group, Object3D, Scene} from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// @ts-ignore
import StageModel from "../res/3d/stage.glb";

// noinspection JSMethodCanBeStatic
export class Stage {

  constructor(scene: Scene, onLoad: (scene: Object3D) => void) {
    const loader = new GLTFLoader();
    loader.load(StageModel, (gltf: GLTF) => {
      this.setupWorld(gltf.scene);
      scene.add( gltf.scene );
      onLoad( gltf.scene );
    }, (xhr: ProgressEvent) => {
      console.log(`Loaded ${xhr.loaded / xhr.total * 100}%`)
    });
  }

  private setupWorld(scene: Group): void {
    const sunLight = new DirectionalLight(new Color(245,230,210), .004);
    sunLight.add(sunLight.target);
    sunLight.target.position.set(.1, -.2, .1);
    // sunLight.castShadow = true;
    scene.add(sunLight);
    scene.add(new AmbientLight(new Color(255, 255, 255), .002));
  }

}