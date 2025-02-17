import React from "react";
import { Box, Typography } from "@mui/material";

import Lottie from 'react-lottie';
import NotificationGif from '../asset/notification_gif.json'
const NotificationPopup = ({ title, message, type }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 1300,
        backgroundColor: type === "info" ? "#ffffffcc" : "#f8d7da",
        color: type === "info" ? "#000" : "#721c24",
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        // maxWidth: "350px",
        // minWidth:"250px",
        width:"350px",
       minHeight:"50px",
       maxHeight:"65px",
        display: "flex",
        flexDirection: "row", // Arrange items in a row
        alignItems: "center", // Center icon and text vertically
        gap: "8px", // Add space between icon and text
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: type === "info" ? "#007bff33" : "#f5c6cb",
          color: type === "info" ? "#007bff" : "#721c24",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          flexShrink: 0, // Prevent shrinking of the icon
        }}
      >
          <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: NotificationGif,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={35}
              width={35}
            />
     
      </Box>

      {/* Title and Message */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Stack title and message
          gap: "4px",
          flex: 1, // Allow text to take remaining space
        }}
      >
        {/* Title */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            color: type === "info" ? "#000" : "#721c24",
            fontSize: "14px",
            whiteSpace: "nowrap", // Keep title in a single line
            overflow: "hidden", // Hide overflow content
            textOverflow: "ellipsis", // Add "..." for overflowing text
          }}
        >
          {title}
        </Typography>

        {/* Message */}
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            color: type === "info" ? "#555" : "#721c24",
            overflow: "hidden", // Hide overflow content
            textOverflow: "ellipsis", // Add "..." for overflowing text
            display: "-webkit-box", // For multi-line ellipsis
            WebkitLineClamp: 1, // Show max 2 lines
            WebkitBoxOrient: "vertical", // Maintain vertical orientation for text
            whiteSpace: "normal", // Allow wrapping to the next line
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationPopup;
