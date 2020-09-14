import { Sprite, SpriteMaterial, Texture, TextureLoader } from "three";

export class Comedian extends Sprite {

  personName: String;
  
  constructor(faceURL: string, name: string) {

    const spriteMap: Texture = new TextureLoader().load(faceURL);
    const myMat: SpriteMaterial = new SpriteMaterial({map: spriteMap})
    super(myMat);

    this.personName = name;
    
  }

}