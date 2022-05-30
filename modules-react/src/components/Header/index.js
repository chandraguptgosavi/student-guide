import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import Paths from '../../utils/paths';

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);
  const navigate = useNavigate();

  let isAppInstalled = false;

  if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  };

  return (
    <Menu stackable inverted size="massive" style={{ height: "8.3%" }}>
      <Menu.Item header>
        <h1 style={{ color: "#2185D0" }}>Aptitude Section</h1>
      </Menu.Item>
      {/* {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="cloud download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )} */}
      <Menu.Item position="right">
        <h1
          style={{ color: "#2185D0", marginRight: "0.5em", cursor: "pointer" }}
          onClick={(e) => {
            navigate(Paths.CONTRIBUTE);
          }}
        >
          Contribute
        </h1>
        <h1
          style={{ color: "#2185D0", marginLeft: "0.5em", cursor: "pointer" }}
        >
          Home
        </h1>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
