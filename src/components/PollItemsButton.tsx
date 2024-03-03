import {
  Box,
  Button,
  LinearProgress,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { Poll, PollItem } from "../models/PollModels";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PollService from "../services/PollService";
import FlexBetween from "./FlexBwtween";

const PollItemsButton = ({
  poll,
  setPoll,
}: {
  poll: Poll;
  setPoll: Dispatch<SetStateAction<Poll>>;
}) => {
  const [totalVotes, setTotalVotes] = useState(-1);
  const [checkItemId, setCheckItemId] = useState("");

  const calItemContribution = (item: PollItem) => {
    return totalVotes === 0 ? 0 : (item.voteCount * 100.0) / totalVotes;
  };

  const onVote = (item: PollItem) => {
    PollService.vote(poll.id, item.id)
      .then((data) => {
        setPoll(data);
        setCheckItemId(item.id);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setTotalVotes(poll.items.map((i) => i.voteCount).reduce((a, b) => a + b));
  }, [poll]);

  return (
    <Stack overflow="auto" spacing={2} sx={{ flex: 1 }}>
      {poll.items.map((item) => (
        <Button
          variant="outlined"
          key={item.id}
          sx={{
            textTransform: "none",
            backgroundColor: "transparent",
            "&:hover": {
              background: "none",
              border: "0.13rem solid black",
            },
            border: "0.13rem solid",
            borderColor: checkItemId === item.id ? "black" : "#dcdcdc",
            padding: "0.4rem",
          }}
          onClick={() => onVote(item)}
        >
          <FlexBetween width="100%" gap="0.4rem">
            <Radio checked={checkItemId === item.id} sx={{ padding: "0" }} />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{item.text}</Typography>
                <Typography>{`${Math.round(
                  calItemContribution(item)
                )}%`}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%" }}>
                  <LinearProgress
                    sx={{ height: "1rem", borderRadius: "0.5rem" }}
                    variant="determinate"
                    value={calItemContribution(item)}
                  />
                </Box>
              </Box>
            </Box>
          </FlexBetween>
        </Button>
      ))}
    </Stack>
  );
};

export default PollItemsButton;
