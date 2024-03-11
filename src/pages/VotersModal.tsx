import { Close } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

  useEffect(() => {
    setIsLoading(true);
    dispatch(getVoters(itemId))
      .unwrap()
      .then((res) => {
        setVoters(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            {voters.map((user) => (
              <ListItem key={user.id}>
                <ListItemAvatar>
                  <CustomAvatar name={user.username} />
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={user.email} />
              </ListItem>
            ))}
          </List>
          {isLoading && <LoadingContent />}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VotersModal;
