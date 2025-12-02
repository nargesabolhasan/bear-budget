import { ColorOption } from "@/types/global";

const colors = [
  // Reds
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-danger",

  // Oranges
  "bg-orange-100",
  "bg-orange-200",
  "bg-orange-300",
  "bg-orange-400",

  // Yellows
  "bg-yellow-100",
  "bg-yellow-200",
  "bg-yellow-300",
  "bg-yellow-400",

  // Greens
  "bg-green-200",
  "bg-green-300",
  "bg-green-400",
  "bg-olive text-white",
  "bg-olive_darb text-white",
  "bg-primary_light",
  "bg-primary",

  // Teals
  "bg-teal-100",
  "bg-teal-300",
  "bg-teal-400",
  "bg-[#4796b5]",

  // Cyans
  "bg-cyan-200",
  "bg-cyan-300",
  "bg-cyan-400",

  // Blues
  "bg-blue-200",
  "bg-blue-300",
  "bg-blue-400",

  // Indigos
  "bg-indigo-300",
  "bg-indigo-400",

  // Purples
  "bg-purple-100",
  "bg-purple-200",
  "bg-purple-300",
  "bg-purple-400",

  // Violets
  "bg-violet-200",
  "bg-violet-300",
  "bg-violet-400",

  // Pink
  "bg-pink-300",
  "bg-pink-400",
  "bg-[#ff2b80]",

  // Fuchsias
  "bg-fuchsia-300",
  "bg-fuchsia-400",
  "bg-[#c240c0]",

  // Light Grays
  "bg-gray-100",
  "bg-gray-200",
  "bg-gray-300",
  "bg-gray-400",

  // Browns
  "bg-yellow-800 text-white", // Light brown
  "bg-yellow-500", // Medium brown
  "bg-yellow-900 text-white", // Slightly darker brown
  "bg-orange-950 text-white", // Darker brown
  "bg-secondary",
];

export const colorListGenerator = (): ColorOption[] => {
  return colors.map((color, index) => ({ id: index, color: color }));
};

export const colorList: ColorOption[] = colorListGenerator();
