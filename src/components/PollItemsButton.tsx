import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Modal,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Poll, PollItem } from "../models/PollModels";
import VotersModal from "../pages/VotersModal";
import FlexBetween from "./FlexBwtween";

const PollItemsButton = ({
  poll,
  onVote,
}: {
  poll: Poll;
  onVote: Dispatch<SetStateAction<PollItem>>;
}) => {
  const [totalVotes, setTotalVotes] = useState(-1);
  const [isOpenView, setIsOpenView] = useState(false);
  const [viewItemId, setViewItemId] = useState("");

  const calItemContribution = (item: PollItem) => {
    return totalVotes === 0 ? 0 : (item.voteCount * 100.0) / totalVotes;
  };

  useEffect(() => {
    setTotalVotes(poll.items.map((i) => i.voteCount).reduce((a, b) => a + b));
  }, [poll]);

  const openView = (id: string) => {
    setIsOpenView(true);
    setViewItemId(id);
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ mt: "1rem", textAlign: "left", margin: "0" }}
      >
        Total Votes: {totalVotes}
      </Typography>
      <Stack overflow="auto" spacing={2} sx={{ flex: 1 }}>
        {poll.items.map((item) => (
          <Box
            key={item.id}
            display="flex"
            gap="0.1rem"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Button
              fullWidth
              variant="outlined"
              sx={{
                textTransform: "none",
                backgroundColor: "transparent",
                "&:hover": {
                  background: "none",
                  border: "0.13rem solid black",
                  transition: "0.05s",
                },
                border: "0.13rem solid",
                borderColor: item.voted ? "black" : "#dcdcdc",
                padding: "0.4rem",
              }}
              onClick={() => onVote(item)}
            >
              <FlexBetween width="100%" gap="0.4rem">
                <Radio checked={item.voted} sx={{ padding: "0" }} />
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
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
            <IconButton
              disabled={poll.anonymous}
              onClick={() => openView(item.id)}
            >
              {poll.anonymous ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
            {viewItemId === item.id && (
              <Modal open={isOpenView}>
                <Box>
                  <VotersModal
                    setIsOpen={setIsOpenView}
                    pollId={poll.id}
                    itemId={item.id}
                  />
                </Box>
              </Modal>
            )}
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default PollItemsButton;
