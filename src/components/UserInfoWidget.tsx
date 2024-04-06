import { MailOutline, PersonAdd, PersonRemove } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";
import {
    setFollowDrawer,
    setIsShownFollower,
} from "../redux/reducers/ConfigSlice";
import {
    selectCurrentUserInfo,
    selectGetUserInfoStatus,
    setCurrentUserFollowerCount,
    toggleFollowing
} from "../redux/reducers/UserSlice";
import { followUser, getUserInfo, unFollowUser } from "../services/UserService";
import { APIStatus } from "../types/ApiStatusType";
import FlexBetween from "./FlexBwtween";
import LoadingContent from "./LoadingContent";
const UserInfoWidget = ({ userId }) => {
  const user = useAppSelector(selectCurrentUserInfo);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectGetUserInfoStatus);
  const systemUserId = useAppSelector(selectUser).email;

  useEffect(() => {
    if (userId === "" || userId === null) return;
    dispatch(getUserInfo(userId));
  }, [userId]);

  const onFollow = () => {
    if (user.following) {
      dispatch(unFollowUser(userId));
      dispatch(setCurrentUserFollowerCount(user.followerCount - 1));
    } else {
      dispatch(followUser(userId));
      dispatch(setCurrentUserFollowerCount(user.followerCount + 1));
    }
    dispatch(toggleFollowing());
  };

  return (
    <Box
      sx={{
        margin: "0.75rem 0",
      }}
    >
      <Card sx={{ position: "relative" }}>
        {userId !== systemUserId && (
          <IconButton
            sx={{ position: "absolute", top: "1rem", right: "1rem" }}
            onClick={onFollow}
          >
            {user?.following ? <PersonRemove /> : <PersonAdd />}
          </IconButton>
        )}
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  marginRight: "0.5rem",
                }}
              >
                <Avatar
                  src={user?.picture}
                  sx={{
                    width: "7rem",
                    height: "7rem",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h3">{user?.username}</Typography>
                <FlexBetween>
                  <Typography variant="h4" color="textSecondary">
                    {user?.email}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      window.location.href = `mailto:${user.email}`;
                    }}
                  >
                    <MailOutline />
                  </IconButton>
                </FlexBetween>
              </Box>
              <FlexBetween
                justifyContent="space-between"
                width="100%"
                sx={{ marginTop: "1rem" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(setFollowDrawer(true));
                    dispatch(setIsShownFollower(true));
                  }}
                >
                  <Typography variant="h5">Followers</Typography>
                  <Typography variant="h3">{user?.followerCount}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(setFollowDrawer(true));
                    dispatch(setIsShownFollower(false));
                  }}
                >
                  <Typography variant="h5">Following</Typography>
                  <Typography variant="h3">{user?.followingCount}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <Typography variant="h5">Polls</Typography>
                  <Typography variant="h3">{user?.pollCount}</Typography>
                </Box>
              </FlexBetween>
            </Box>
          </Box>
        </CardContent>
        {status === APIStatus.LOADING && <LoadingContent />}
      </Card>
    </Box>
  );
};

export default UserInfoWidget;
