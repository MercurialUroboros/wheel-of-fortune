import { Assets, Container, Text, Sprite } from 'pixi.js';

export class Wheel extends Container {

  constructor () {
    super()
    this.buildWheel()
  }


  private buildWheel () {
    const radius = 250;
    const numberOfSectors = 8;
    const piTwo = Math.PI * 2;
    const radiansPerSector = piTwo / numberOfSectors;
    const texture = Assets.get('wheelSlice')
    const container = new Container()
    for (let sector = 0; sector < numberOfSectors; sector++) {
      const text = new Text(sector, { fill: '#000000' });

      const startingAngle = (sector * radiansPerSector) - (radiansPerSector / 2);
      const endingAngle = startingAngle + radiansPerSector;

      const slice = new Sprite(texture)
      const rotation = (sector * radiansPerSector)
      const textAnchorPercentage = (radius - 40 / 2) / radius;

      slice.anchor.set(0.5, 0.5);
      slice.rotation = rotation + Math.PI;
      slice.position.x = radius
        + radius * textAnchorPercentage * Math.cos(rotation);

      slice.position.y = radius
        + radius * textAnchorPercentage * Math.sin(rotation);

      container.addChild(slice)
    }

    container.x = 300
    container.y = 300
    this.addChild(container)

  }

}