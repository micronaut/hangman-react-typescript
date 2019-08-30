import { IShape } from "./IShape";
import { ShapeType } from "./ShapeType";

const SHAPES: Array<IShape> = [
  {
    name: "base",
    shape: ShapeType.Line,
    coords: { start: { x: 80, y: 300 }, end: { x: 160, y: 300 } }
  },
  {
    name: "post",
    shape: ShapeType.Line,
    coords: { start: { x: 120, y: 300 }, end: { x: 120, y: 45 } }
  },
  {
    name: "horizontal-bar",
    shape: ShapeType.Line,
    coords: { start: { x: 120, y: 45 }, end: { x: 300, y: 45 } }
  },
  {
    name: "vertical-bar",
    shape: ShapeType.Line,
    coords: { start: { x: 300, y: 45 }, end: { x: 300, y: 80 } }
  },
  {
    name: "head-right",
    shape: ShapeType.Arc,
    coords: { start: { x: 90, y: 270 }, end: { x: 0, y: 0 } }
  },
  {
    name: "head-left",
    shape: ShapeType.Arc,
    coords: { start: { x: 90, y: -270 }, end: { x: 0, y: 0 } }
  },
  {
    name: "body",
    shape: ShapeType.Line,
    coords: { start: { x: 300, y: 120 }, end: { x: 300, y: 200 } }
  },
  {
    name: "left-arm",
    shape: ShapeType.Line,
    coords: { start: { x: 300, y: 140 }, end: { x: 250, y: 120 } }
  },
  {
    name: "right-arm",
    shape: ShapeType.Line,
    coords: { start: { x: 300, y: 140 }, end: { x: 350, y: 120 } }
  },
  {
    name: "left-leg",
    shape: ShapeType.Line,
    coords: { start: { x: 300, y: 200 }, end: { x: 350, y: 230 } }
  },
  {
    name: "right-leg",
    shape: ShapeType.Line,
    coords: { start: { x: 300, y: 200 }, end: { x: 250, y: 230 } }
  }
];

export { SHAPES };
