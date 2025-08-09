import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import FaceIcon from "@mui/icons-material/Face";
import { IconOptionMap } from "@/types/global";

export const iconList: IconOptionMap = new Map([
  ["1", { id: "1", icon: HomeIcon }],
  ["2", { id: "2", icon: FaceIcon }],
  ["3", { id: "3", icon: StarIcon }],
  ["4", { id: "4", icon: FavoriteIcon }],
]);
