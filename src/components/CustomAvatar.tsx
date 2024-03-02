import { Avatar } from "@mui/material";
import { toAvatarText } from "../utils/TextUtil";

const CustomAvatar = ({ name }: { name: string }) => {
  return (
    <Avatar
      sx={{
        height: "1.9rem",
        width: "1.9rem",
      }}
    >
      {toAvatarText(name)}
    </Avatar>
  );
};

export default CustomAvatar;
