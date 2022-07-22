import Button from "@mui/material/Button";
import React from "react";
import StarBorder from "@mui/icons-material/StarBorder";
import gtag from "../../gtag";

const StarUsOnGithub = ({ color, source }) => {
  return (
    <Button
      size="large"
      startIcon={<StarBorder fontSize="large" />}
      sx={{
        textTransform: "none",
        fontSize: "1rem",
        color: color || "white",
      }}
      onClick={() => {
        window.open("https://github.com/NucleoidJS/Nucleoid", "_blank");
        gtag("event", "click_github", {
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }}
    >
      Star us on Github
    </Button>
  );
};

export default StarUsOnGithub;
