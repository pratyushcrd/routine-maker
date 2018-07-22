// This file is shared across the demos.

import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DaysIcon from '@material-ui/icons/Today'
import PersonIcon from '@material-ui/icons/Person'
import ClassIcon from '@material-ui/icons/AccountBalance'
import Divider from '@material-ui/core/Divider'
import { setScreen } from './actions/app'

const changeScreen = (props, screenIndex) => () => props.dispatch(setScreen(screenIndex))

const navListItems = (props) => (
  <div>
    <ListItem button onClick={changeScreen(props, 0)}>
      <ListItemIcon>
        <DaysIcon />
      </ListItemIcon>
      <ListItemText primary="Days" />
    </ListItem>
    <Divider />
    <ListItem button onClick={changeScreen(props, 1)}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Teachers" />
    </ListItem>
    <Divider />
    <ListItem button onClick={changeScreen(props, 2)}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Classes" />
    </ListItem>
    <Divider />
    <ListItem button onClick={changeScreen(props, 3)}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Common Areas" />
    </ListItem>
    <Divider />
  </div>
)

export { navListItems as default }
