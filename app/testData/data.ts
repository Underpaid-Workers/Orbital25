import { ImageURISource } from "react-native";

//TODO : temp fix for image data handling. Affects ALL items in data
const image = require("../testData/YellowBird.jpg");

interface entry {
  id: string;
  name: string;
  dateTime: Date;
  image: ImageURISource;
  description: string;
  height: string;
  weight: string;
  lifespan: string;
  observations: string;
}

const data: entry[] = [
  {
    id: "1",
    name: "Weird Bird",
    dateTime: new Date(Date.UTC(2025, 5, 5, 13, 40)),
    image: image,
    description: "Much cute, Might shit on you later.",
    height: "0.1m-0.4m",
    weight: "0.05kg-0.3kg",
    lifespan: "10-12 years",
    observations: "Found screaming at the top of its lungs for a mate...",
  },
  {
    id: "2",
    name: "Yellow Bird",
    dateTime: new Date(Date.UTC(2025, 5, 5, 13, 40)),
    image: image,
    description: "Much cute, Might shit on you later.",
    height: "0.1m-0.4m",
    weight: "0.05kg-0.3kg",
    lifespan: "10-12 years",
    observations: "Found screaming at the top of its lungs for a mate...",
  },
  {
    id: "3",
    name: "Red Bird",
    dateTime: new Date(Date.UTC(2025, 5, 5, 13, 40)),
    image: image,
    description: "Much cute, Might shit on you later.",
    height: "0.1m-0.4m",
    weight: "0.05kg-0.3kg",
    lifespan: "10-12 years",
    observations: "Found screaming at the top of its lungs for a mate...",
  },
  {
    id: "4",
    name: "Red Bird",
    dateTime: new Date(Date.UTC(2025, 5, 5, 13, 40)),
    image: image,
    description: "Much cute, Might shit on you later.",
    height: "0.1m-0.4m",
    weight: "0.05kg-0.3kg",
    lifespan: "10-12 years",
    observations: "Found screaming at the top of its lungs for a mate...",
  },
  {
    id: "5",
    name: "Red Bird",
    dateTime: new Date(Date.UTC(2025, 5, 5, 13, 40)),
    image: image,
    description: "Much cute, Might shit on you later.",
    height: "0.1m-0.4m",
    weight: "0.05kg-0.3kg",
    lifespan: "10-12 years",
    observations: "Found screaming at the top of its lungs for a mate...",
  },
  {
    id: "6",
    name: "Red Bird",
    dateTime: new Date(Date.UTC(2025, 5, 5, 13, 40)),
    image: image,
    description: "Much cute, Might shit on you later.",
    height: "0.1m-0.4m",
    weight: "0.05kg-0.3kg",
    lifespan: "10-12 years",
    observations: "Found screaming at the top of its lungs for a mate...",
  },
  {
    id: "7",
    name: "Red Bird",
    dateTime: new Date(Date.UTC(2025, 5, 5, 13, 40)),
    image: image,
    description: "Much cute, Might shit on you later.",
    height: "0.1m-0.4m",
    weight: "0.05kg-0.3kg",
    lifespan: "10-12 years",
    observations: "Found screaming at the top of its lungs for a mate...",
  },
];

export default data;
