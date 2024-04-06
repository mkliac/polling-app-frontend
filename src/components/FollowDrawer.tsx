import { PersonAdd, PersonRemove } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PollFilter } from "../models/PollModels";
import { User } from "../models/UserModel";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";
import {
  selectFollowDrawer,
  selectIsShownFollower,
  setFollowDrawer,
  toggleFollowDrawer,
} from "../redux/reducers/ConfigSlice";
import {
  decreaseCurrentUserFollowingCount,
  increaseCurrentUserFollowingCount,
  selectGetFollowingStatus,
  toggleFollowing,
} from "../redux/reducers/UserSlice";
import {
  followUser,
  getFollowers,
  getFollowing,
  unFollowUser,
} from "../services/UserService";
import { APIStatus } from "../types/ApiStatusType";
import CustomAvatar from "./CustomAvatar";
import LoadingContent from "./LoadingContent";

const FollowDrawer = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectGetFollowingStatus);
  const [pageNumber, setPageNumber] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const isOpen = useAppSelector(selectFollowDrawer);
  const isGetFollower = useAppSelector(selectIsShownFollower);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const currentUser = useAppSelector(selectUser);

  const reset = () => {
    setUserList(() => []);
    setPageNumber(0);
    setHasMore(() => true);
  };

  useEffect(() => {
    reset();
  }, [isOpen]);

  useEffect(() => {
    if (pageNumber === -1) {
      reset();
      return;
    }

    if (!hasMore || !isOpen) return;
    dispatch(
      isGetFollower
        ? getFollowers({ userId, pageNumber })
        : getFollowing({ userId, pageNumber })
    )
      .unwrap()
      .then((res) => {
        if (res.length === 0) setHasMore(false);
        else {
          res.forEach((user) => (user.following = true));
          console.log(res);
          setUserList((prevFollowing) => [...prevFollowing, ...res]);
        }
      });
  }, [pageNumber, isOpen]);

  const observer = useRef<any>();
  const lastBookElementRef = useCallback(
    (node) => {
      if (status === APIStatus.LOADING) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasMore]
  );

  const onFollow = (user: User) => {
    if (user.following) {
      dispatch(unFollowUser(user.email));
      dispatch(decreaseCurrentUserFollowingCount());
      setUserList((prev) =>
        prev.map((u) =>
          u.email === user.email ? { ...u, following: false } : u
        )
      );
    } else {
      dispatch(followUser(user.email));
      dispatch(increaseCurrentUserFollowingCount());
      setUserList((prev) =>
        prev.map((u) =>
          u.email === user.email ? { ...u, following: true } : u
        )
      );
    }
    dispatch(toggleFollowing());
  };

  const onAvatarClick = (userId: string) => {
    setSearchParams(
      (prev) => {
        prev.set("filterType", PollFilter.USER);
        prev.set("search", "");
        prev.set("userId", userId);
        return prev;
      },
      { replace: true }
    );
    dispatch(setFollowDrawer(false));
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => dispatch(toggleFollowDrawer())}
    >
      <Box sx={{ minWidth: "18rem", height: "100%" }}>
        <List
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" component="div" sx={{ padding: "1rem" }}>
            {isGetFollower ? "Followers" : "Following"}
          </Typography>
          {userList.map((user, index) =>
            userList.length <= index + 2 ? (
              <div ref={lastBookElementRef} key={user.email}>
                <ListItem>
                  <ListItemAvatar>
                    <IconButton
                      sx={{ padding: "0", margin: "0" }}
                      onClick={() => onAvatarClick(user.email)}
                    >
                      <CustomAvatar src={user.picture} />
                    </IconButton>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                  />
                  {user.email !== currentUser.email && (
                    <IconButton onClick={() => onFollow(user)}>
                      {user.following ? <PersonRemove /> : <PersonAdd />}
                    </IconButton>
                  )}
                </ListItem>
              </div>
            ) : (
              <ListItem key={user.email}>
                <ListItemAvatar>
                  <IconButton
                    sx={{ padding: "0", margin: "0" }}
                    onClick={() => onAvatarClick(user.email)}
                  >
                    <CustomAvatar src={user.picture} />
                  </IconButton>
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={user.email} />
                {user.email !== currentUser.email && (
                  <IconButton onClick={() => onFollow(user)}>
                    {user.following ? <PersonRemove /> : <PersonAdd />}
                  </IconButton>
                )}
              </ListItem>
            )
          )}
          {status === APIStatus.LOADING &&
            (userList.length === 0 ? (
              <LoadingContent />
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default FollowDrawer;
