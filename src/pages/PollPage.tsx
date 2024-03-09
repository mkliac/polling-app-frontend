import { Add, DeleteForever, EventBusy, Remove } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Poll, PollItem } from "../models/PollModels";
import { closePoll, deletePoll, getPoll, vote } from "../services/PollService";
import LoadingPage from "./LoadingPage";
import PollItemsButton from "../components/PollItemsButton";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectPoll } from "../redux/reducers/PollSlice";
import { selectUser } from "../redux/reducers/AuthSlice";

const PollForm = () => {
  const { id } = useParams();
  const pollData = useAppSelector(selectPoll);
  const dispatch = useAppDispatch();
  const [poll, setPoll] = useState<Poll>(pollData);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(selectUser);
  const [checkItemId, setCheckItemId] = useState<string>("");

  useEffect(() => {
    dispatch(getPoll(id));
  }, []);

  const onVote = (item: PollItem) => {
    dispatch(vote({id: poll.id, itemId: item.id})).then((res) => {
      if (res.meta.requestStatus === "fulfilled") setCheckItemId(item.id);
    });
  };

  useEffect(() => {
    if (pollData.id === id) {
      setPoll(pollData);
    }
  }, [pollData]);

  const onDeletePoll = () => {
    dispatch(deletePoll(id));
  };

  const onClosePoll = () => {
    dispatch(closePoll(id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <LoadingPage isLoading={isLoading} />
      {poll === undefined ? (
        <div>Poll with id {id} not exist </div>
      ) : (
        <Card sx={{ width: "550px", padding: "5px 5px", margin: "0 auto" }}>
          {user.username === poll.createdBy.username && (
            <CardHeader
              action={
                <Stack direction="row">
                  <Tooltip title="Add Options">
                    <IconButton>
                      <Add fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Options">
                    <IconButton>
                      <Remove fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close Poll">
                    <IconButton onClick={() => onClosePoll()}>
                      <EventBusy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Poll">
                    <IconButton onClick={() => onDeletePoll()}>
                      <DeleteForever fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />
          )}
          <CardContent
            sx={{
              maxWidth: "550px",
              maxHeight: "80vh",
              overflow: "auto",
              scrollbarGutter: "stable",
            }}
          >
            <Box sx={{ marginBottom: "12px" }}>
              {poll.closedDate && (
                <Typography textAlign="right">
                  Expiry Date:{" "}
                  {new Date(poll.closedDate).toLocaleDateString("en-GB")}
                </Typography>
              )}
              <Typography
                textAlign="left"
                variant="h3"
                component="div"
                sx={{ wordWrap: "break-word" }}
              >
                {poll.title}
              </Typography>
              <Typography textAlign="right">
                {poll.createdBy?.username}
              </Typography>
              <Divider />
              <Typography textAlign="left" variant="body1">
                {poll.description}
              </Typography>
            </Box>
            <PollItemsButton poll={poll} onVote={onVote} checkItemId={checkItemId}/>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PollForm;
