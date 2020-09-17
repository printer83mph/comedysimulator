import { AmbientLight, Color, DirectionalLight, Group, Scene } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// @ts-ignore
import StageModel from "../res/3d/stage.glb";

export class Stage {

  constructor(scene: Scene) {
    const loader = new GLTFLoader();
    loader.load(StageModel, (gltf: GLTF) => {
      this.setupWorld(gltf.scene);
      scene.add( gltf.scene );
    }, (xhr: ProgressEvent) => {
      console.log(`Loaded ${xhr.loaded / xhr.total * 100}%`)
    });
  }

  private setupWorld(scene: Group) {
    const sunLight = new DirectionalLight(new Color(245,230,210), .006);
    sunLight.add(sunLight.target);
    sunLight.target.position.set(.1, -.2, .1);
    scene.add(sunLight);
    scene.add(new AmbientLight(new Color(255, 255, 255), .0004));
  }

}