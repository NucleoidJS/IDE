const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    height: 400,
  },
  tabs: {
    width: 120,
    display: "flex",
    flexDirection: "flex-end",
    borderRight: 1,
    borderColor: "divider",
    "& .MuiTabs-indicator": {
      backgroundColor: "custom.grey",
      height: 3,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "custom.grey",
      bgcolor: "rgba(0,0,0,0.1)",
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    "& .MuiTab-root": {
      color: "custom.grey",
    },
  },
  tab: {
    "& label": { color: "custom.grey" },
  },
};

export default styles;
