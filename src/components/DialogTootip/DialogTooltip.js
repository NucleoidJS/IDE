import CloseIcon from "@mui/icons-material/Close";

import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import styles from "./styles";
import { Grid, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const DialogTooltip = styled(
  ({
    className,
    open,
    handleTooltipClose,
    title,
    message,
    footer,
    ...props
  }) => (
    <Tooltip
      open={open}
      onClose={handleTooltipClose}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title={
        <>
          <Grid container sx={styles.header}>
            <Typography
              sx={{ color: "black", fontSize: "1rem", fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <IconButton onClick={handleTooltipClose} size="small">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid>
            {message}
            {footer}
          </Grid>
        </>
      }
      {...props}
      classes={{ popper: className }}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    // maxWidth: 220,
    width: 600,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export default DialogTooltip;
