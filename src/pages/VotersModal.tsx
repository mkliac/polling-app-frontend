import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CustomAvatar from "../components/CustomAvatar";
import LoadingContent from "../components/LoadingContent";
import { User } from "../models/UserModel";
import { useAppDispatch } from "../redux/hook";
import { getVoters } from "../services/PollService";

const VotersModal = ({
  setIsOpen,
  itemId,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  itemId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [voters, setVoters] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(-1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (pageNumber === -1) {
      setVoters(() => []);
      setPageNumber(0);
      setHasMore(() => true);
      return;
    }

    setIsLoading(true);
    dispatch(getVoters({ itemId, pageNumber }))
      .unwrap()
      .then((res) => {
        if (res.length === 0) setHasMore(false);
        setVoters((prevVoters) => [...prevVoters, ...res]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageNumber]);

  const observer = useRef<any>();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ minWidth: "16rem" }}>
        <CardHeader
          action={
            <IconButton onClick={() => setIsOpen(false)}>
              <Close />
            </IconButton>
          }
          title="Peoples"
        />
        <Divider />
        <CardContent sx={{ padding: "0", position: "relative" }}>
          <List
            sx={{
              width: "100%",
              height: "16rem",
              bgcolor: "background.paper",
              overflowY: "auto",
            }}
          >
            {voters.map((user, index) =>
              voters.length === index + 1 ? (
                <div ref={lastBookElementRef} key={user.email}>
                  <ListItem>
                    <ListItemAvatar>
                      <CustomAvatar src={user.picture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.username}
                      secondary={user.email}
                    />
                  </ListItem>
                </div>
              ) : (
                <ListItem key={user.email}>
                  <ListItemAvatar>
                    <CustomAvatar src={user.picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                  />
                </ListItem>
              )
            )}
            {isLoading &&
              (voters.length === 0 ? (
                <LoadingContent />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VotersModal;
