import Box from "@mui/material/Box";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <>
      {value === index && (
        <Box
          sx={{
            pl: 2,
            pr: 1,
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
};

export default TabPanel;
