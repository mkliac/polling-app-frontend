import {
  ContentCopy,
  Done,
  Share
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";

const BASE_URL = window.location.origin;
const PollShareModal = ({ id }) => {
  const url = `${BASE_URL}/polls/${id}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Card>
        <CardContent>
          <Box
            gap={4}
            marginBottom={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              fontSize={48}
              textAlign="center"
              color={"lightgreen"}
            >
              SHARE
            </Typography>
            <Share
              sx={{ height: "48px", width: "48px", color: "lightgreen" }}
            />
          </Box>
          <Typography>Poll Id: {id}</Typography>
          <QRCode value={url} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography textAlign="center" justifyContent="center">
              <Link href={url}>Link</Link>
            </Typography>
            {copied ? (
              <IconButton disableRipple={true} sx={{ cursor: "default" }}>
                <Done fontSize="small" />
              </IconButton>
            ) : (
              <IconButton onClick={handleCopy}>
                <ContentCopy fontSize="small" />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PollShareModal;
