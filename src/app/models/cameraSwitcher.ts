import {Camera, Object3D, PerspectiveCamera} from "three";

class CameraSwitcher {

  public currentCamera: Camera;
  private cameras: { [name: string]: Camera };

  constructor(root: Object3D, currentCameraName: string = null) {
    this.scanCameras(root);
    if (currentCameraName != null) {
      this.switchToCamera(currentCameraName);
    }
  }

  public scanCameras(root: Object3D) {
    this.cameras = {};
    for (const obj of root.children) {
      if (obj.children.length == 0) continue;
      const child = obj.children[0];
      if (child instanceof Camera) {
        this.cameras[obj.name] = child;
      }
    }
  }

  public switchToCamera(cameraName: string) {
    this.currentCamera = this.cameras[cameraName];
    if (this.currentCamera instanceof PerspectiveCamera) {
      this.currentCamera.aspect = innerWidth / innerHeight;
      this.currentCamera.updateProjectionMatrix();
    }
  }

}

export default CameraSwitcher