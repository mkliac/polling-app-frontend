import { Avatar, AvatarProps, styled } from "@mui/material";

const StyleAvatar = styled(Avatar)({
  height: "1.9rem",
  width: "1.9rem",
});

const CustomAvatar = (props: AvatarProps) => {
  return <StyleAvatar {...props} />;
};

export default CustomAvatar;
