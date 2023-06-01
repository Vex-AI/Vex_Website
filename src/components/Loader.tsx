import React from "react";
import ClimbLoader from "../anim/loaders/ClimbLoader";
import RippleLoader from "../anim/loaders/RippleLoader";
import GridLoader from "../anim/loaders/GridLoader";
import RotateLoader from "../anim/loaders/RotateLoader";
import RingLoader from "../anim/loaders/RingLoader";
import EllipsisLoader from "../anim/loaders/EllipsisLoader";
import FaceBookLoader from "../anim/loaders/FaceBookLoader";
import BoxLoader from "../anim/loaders/BoxLoader";
import ScaleLoader from "../anim/loaders/ScaleLoader";
import CircleLoader from "../anim/loaders/CircleLoader";
import BlockLoader from "../anim/loaders/BlockLoader";
import FlipLoader from "../anim/loaders/FlipLoader";
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader as ReactCircleLoader,
  ClimbingBoxLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader as ReactGridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PuffLoader,
  PulseLoader,
  RingLoader as ReactRingLoader,
  RiseLoader,
  RotateLoader as ReactRotateLoader,
  ScaleLoader as ReactScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
} from "react-spinners";

interface LoaderProps {
  color?: string;
  size?: number;
}

const loaders = [
  ClimbLoader,
  RippleLoader,
  GridLoader,
  RotateLoader,
  RingLoader,
  EllipsisLoader,
  FaceBookLoader,
  BoxLoader,
  ScaleLoader,
  CircleLoader,
  BlockLoader,
  FlipLoader,
  BarLoader,
  BeatLoader,
  BounceLoader,
  ReactCircleLoader,
  ClimbingBoxLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  ReactGridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PuffLoader,
  PulseLoader,
  ReactRingLoader,
  RiseLoader,
  ReactRotateLoader,
  ReactScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
];

const Loader: React.FC<LoaderProps> = ({ color = "white", size = 40 }) => {
  const randomIndex = Math.floor(Math.random() * loaders.length);
  const LoaderComponent = loaders[randomIndex];

  return (
    <div
      style={{
        width: "100%",
        padding:0,
        margin:0,
        height:"auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <LoaderComponent style={{ margin: "auto" }} size={size} color={color} />
    </div>
  );
};

export default Loader;
