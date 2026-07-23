import { ColorOption } from "@/types/global";

const colors = [
  // Reds
  "bg-red-100 text-dark",
  "bg-red-200 text-dark",
  "bg-red-300 text-dark",
  "bg-red-400 text-dark",
  "bg-danger text-dark",

  // Pink
  "bg-pink-300 text-dark",
  "bg-pink-400 text-dark",
  "bg-[#fd79a8] text-dark", // Soft pink
  "bg-[#ff2b80] text-dark",

  // Purples
  "bg-purple-100 text-dark",
  "bg-purple-200 text-dark",
  "bg-purple-300 text-dark",
  "bg-purple-400 text-dark",

  // Violets
  "bg-violet-300 text-dark",
  "bg-violet-400 text-white",

  // Fuchsias
  "bg-fuchsia-300 text-dark",
  "bg-fuchsia-400 text-dark",
  "bg-[#c240c0] text-white",

  // Indigos
  "bg-indigo-300 text-dark",
  "bg-indigo-400 text-dark",

  // Oranges
  "bg-orange-100 text-dark",
  "bg-orange-200 text-dark",
  "bg-orange-300 text-dark",
  "bg-orange-400 text-dark",
  "bg-[#e17055] text-white", // Coral
  "bg-yellow-500 text-dark",

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

  //lime
  "bg-lime-200 text-dark",
  "bg-lime-300 text-dark",
  "bg-lime-400 text-dark",

  "bg-[#00b894] text-dark", // Mint
  "bg-[#20c997] text-dark", // Emerald mint
  "bg-[#00cec9] text-dark", // Aqua

  // Teals
  "bg-teal-100 text-dark",
  "bg-teal-300 text-dark",
  "bg-[#4796b5] text-white",

  // Cyans
  "bg-cyan-200 text-dark",
  "bg-cyan-300 text-dark",
  "bg-cyan-400 text-dark",

  // Blues
  "bg-blue-200 text-dark",
  "bg-blue-300 text-dark",
  "bg-blue-400 text-dark",
  "bg-blue-600 text-white",
  "bg-blue-700 text-white",
  "bg-blue-800 text-white",

  // Light Grays
  "bg-gray-100 text-dark",
  "bg-gray-200 text-dark",
  "bg-gray-300 text-dark",
  "bg-gray-400 text-dark",

  "bg-black text-white",
  "bg-[#607d8b] text-white", // Blue gray
  "bg-neutral-600 text-white",

  // Browns
  "bg-yellow-900 text-white",
  "bg-secondary text-dark",
  "bg-[#795548] text-white", // Brown

  //-----------

  // Mauve
  "bg-[#C9A0DC] text-dark",
  // Dusty Rose
  "bg-[#D8A7B1] text-dark",
  // Terracotta
  "bg-[#C97C5D] text-white",
  // Copper
  "bg-[#B87333] text-white",
  // Mustard
  "bg-[#D4A017] text-dark",
  // Forest
  "bg-[#2E7D32] text-white",
  // Navy
  "bg-[#1E3A5F] text-white",
  // Steel Blue
  "bg-[#4682B4] text-white",
  // Plum
  "bg-[#8E4585] text-white",
  // Burgundy
  "bg-[#800020] text-white",
  // Raspberry
  "bg-[#C72C48] text-white",
  // Chocolate
  "bg-[#5D4037] text-white",
  // Charcoal
  "bg-[#36454F] text-white",
  // Graphite
  "bg-[#4B5563] text-white",
];

export const colorListGenerator = (): ColorOption[] => {
  return colors.map((color, index) => ({ id: index, color: color }));
};

export const colorList: ColorOption[] = colorListGenerator();
