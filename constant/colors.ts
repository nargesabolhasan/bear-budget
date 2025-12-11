import { ColorOption } from "@/types/global";

const colors = [
  // Reds
  "bg-red-100 text-dark",
  "bg-red-200 text-dark",
  "bg-red-300 text-dark",
  "bg-red-400 text-dark",
  "bg-danger text-dark",

  // Oranges
  "bg-orange-100 text-dark",
  "bg-orange-200 text-dark",
  "bg-orange-300 text-dark",
  "bg-orange-400 text-dark",

  // Yellows
  "bg-yellow-100 text-dark",
  "bg-yellow-200 text-dark",
  "bg-yellow-300 text-dark",
  "bg-yellow-400 text-dark",

  // Greens
  "bg-green-200 text-dark",
  "bg-green-300 text-dark",
  "bg-green-400 text-dark",
  "bg-olive text-white",
  "bg-olive_darb text-white",
  "bg-primary_light text-dark",
  "bg-primary text-dark",

  // Teals
  "bg-teal-100 text-dark",
  "bg-teal-300 text-dark",
  "bg-teal-400 text-dark",
  "bg-[#4796b5] text-white",

  // Cyans
  "bg-cyan-200 text-dark",
  "bg-cyan-300 text-dark",
  "bg-cyan-400 text-dark",

  // Blues
  "bg-blue-200 text-dark",
  "bg-blue-300 text-dark",
  "bg-blue-400 text-dark",

  // Indigos
  "bg-indigo-300 text-dark",
  "bg-indigo-400 text-dark",

  // Purples
  "bg-purple-100 text-dark",
  "bg-purple-200 text-dark",
  "bg-purple-300 text-dark",
  "bg-purple-400 text-dark",

  // Violets
  "bg-violet-200 text-dark",
  "bg-violet-300 text-dark",
  "bg-violet-400 text-white",

  // Pink
  "bg-pink-300 text-dark",
  "bg-pink-400 text-dark",
  "bg-[#ff2b80] text-dark",

  // Fuchsias
  "bg-fuchsia-300 text-dark",
  "bg-fuchsia-400 text-dark",
  "bg-[#c240c0] text-white",

  // Light Grays
  "bg-gray-100 text-dark",
  "bg-gray-200 text-dark",
  "bg-gray-300 text-dark",
  "bg-gray-400 text-dark",

  // Browns
  "bg-secondary text-dark",
  "bg-yellow-500 text-dark",
  "bg-yellow-900 text-white",
];

export const colorListGenerator = (): ColorOption[] => {
  return colors.map((color, index) => ({ id: index, color: color }));
};

export const colorList: ColorOption[] = colorListGenerator();
