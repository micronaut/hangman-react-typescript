import { Coordinate } from "./Coordinate";
import { ShapeType } from "./ShapeType";

export interface IShape {
  name: string;
  shape: ShapeType;
  coords: { start: Coordinate; end: Coordinate };
}
