import { StaticImageData } from "next/image";

export type Fruit = {
  name: string;
  imageSrc: StaticImageData;
  worth: number;
};

export const fruits: Fruit[] = [
  {
    name: "cherries",
    imageSrc: require("../../public/cherries.png"),
    worth: 1,
  },
  {
    name: "watermelon",
    imageSrc: require("../../public/watermelon.png"),
    worth: 1,
  },
  {
    name: "grapes",
    imageSrc: require("../../public/grapes.png"),
    worth: 1,
  },
  {
    name: "horseshoe",
    imageSrc: require("../../public/horseshoe.png"),
    worth: 1,
  },
  {
    name: "orange",
    imageSrc: require("../../public/orange.png"),
    worth: 1,
  },
  {
    name: "clover",
    imageSrc: require("../../public/clover.png"),
    worth: 5,
  },
  {
    name: "lemon",
    imageSrc: require("../../public/lemon.png"),
    worth: 3,
  },
  {
    name: "seven",
    imageSrc: require("../../public/seven.png"),
    worth: 5,
  },
  {
    name: "diamond",
    imageSrc: require("../../public/diamond.png"),
    worth: 10,
  },
];
