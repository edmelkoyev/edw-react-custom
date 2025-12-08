import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import 'typeface-roboto';

// Import pages
import Home from './pages/Home';
import Plain from './pages/Plain';
import ReactWindow from './pages/ReactWindow';
import TanStack from './pages/TanStack';
import TanStackScroll from './pages/TanStackScroll';
import TanStackSafari from './pages/TanStackSafari';



const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">LMS-16063</Typography>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/plain">Plain</Button>
                        <Button color="inherit" component={Link} to="/react-window">RW01</Button>
                        <Button color="inherit" component={Link} to="/tan-stack">TS01</Button>
                        <Button color="inherit" component={Link} to="/tan-stack-scroll">TS02</Button>
                        <Button color="inherit" component={Link} to="/tan-stack-safari">TS03</Button>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <div style={{ padding: 20 }}>
                        <Typography variant="body1" gutterBottom>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut 
                            laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation 
                            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in 
                            hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros
                            et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te
                            feugait nulla facilisi.
                        </Typography>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/plain" component={Plain} />
                            <Route path="/react-window" component={ReactWindow} />
                            <Route path="/tan-stack" component={TanStack} />
                            <Route path="/tan-stack-scroll" component={TanStackScroll} />
                            <Route path="/tan-stack-safari" component={TanStackSafari} />
                        </Switch>
                    </div>
                </Container>
            </Router>
    </ThemeProvider>
  );
}

export default App;