import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

import { navBarSx, navLinksSx } from "~/common/styles";

const AppNavigation = () => {
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0} sx={navBarSx}>
      <Toolbar>
        <Typography variant="h6">Electricity statistics</Typography>
        <Toolbar disableGutters sx={navLinksSx}>
          <Button
            component={Link}
            to="/"
            color={location.pathname === "/" ? "primary" : "inherit"}
          >
            Daily list
          </Button>
          <Button
            component={Link}
            to="/day"
            color={location.pathname === "/day" ? "primary" : "inherit"}
          >
            Single day
          </Button>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigation;
