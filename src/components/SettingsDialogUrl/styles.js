const styles = {
  root: { height: "100%" },
  runtimeSelection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 35,
  },
  textField: {
    width: 400,
    "& label.Mui-focused": {
      color: "#747474",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#282828",
      },
      "&:hover fieldset": {
        borderColor: "#282828",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#bdbdbd",
      },
      "& .MuiInputBase-input": {
        color: "custom.grey",
      },
      ".MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "gray",
        color: "gray",
      },
    },
  },
};

export default styles;
