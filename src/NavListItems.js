// This file is shared across the demos.

import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DaysIcon from '@material-ui/icons/Today'
import PersonIcon from '@material-ui/icons/Person'
import ClassIcon from '@material-ui/icons/AccountBalance'
import Divider from '@material-ui/core/Divider'

const navListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DaysIcon />
      </ListItemIcon>
      <ListItemText primary="Days" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Teachers" />
    </ListItem>
    <Divider />
    <ListItem button>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Classes" />
    </ListItem>
    <Divider />
  </div>
)

export { navListItems as default }
