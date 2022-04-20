// React
import React from 'react';
import { useEffect, useState } from 'react';
// Material UI
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Tooltip } from '@mui/material';
// Next theme
import { useTheme } from 'next-themes';
// Material UI
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

function Sidebar() {
  const {systemTheme, theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <LightModeIcon role="button" onClick={() => setTheme
          ('light')
        }/>
      )
    } else {
      return (
        <ModeNightIcon role="button" onClick={() => setTheme
          ('dark')
        }/>
      )
    }
  }
  return (
    <>
      <div className="sidebar">
        <Tooltip title="Dark Mode / Light Mode" disableFocusListener placement="right">
        <div className="sidebar-themeChanger">
            {renderThemeChanger()}
        </div>
       </Tooltip>
        <Tooltip title="@holidaze" disableFocusListener placement="right">
          <TwitterIcon className="icon" icon="fa6-brands:twitter-square" color="black" />
       </Tooltip>
       <Tooltip title="facebook.com/holidaze" disableFocusListener placement="right">
          <FacebookIcon className="icon" icon="fa6-brands:twitter-square" color="black" />
       </Tooltip>
       <Tooltip title="@holidaze" disableFocusListener placement="right">
          <InstagramIcon className="icon" icon="fa6-brands:twitter-square" color="black" />
       </Tooltip>
       <div className="sidebar-text">
         <p>holidayze@booking.com</p>
         <p>(+47) 12345678</p>
       </div>
      </div>
    </>
  )
}

export default Sidebar;
