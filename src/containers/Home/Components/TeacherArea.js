import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import GroupAdd from '@material-ui/icons/GroupAdd'
import PropTypes from 'prop-types'
import ShowTeacher from './ShowTeacher'

const styles = theme => ({
    header: {
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
      },
    
    backPaperContainer: {
      height: '100%',
    },
    backPaper: {
      height: '100%',
      padding: theme.spacing.unit * 0,
      paddingTop: theme.spacing.unit * 1.5,
    },
  })

const TeacherArea = (props) => {
    
    const classes = props.classes
    return (
      <Grid container className={classes.backPaperContainer}>
        <Grid item xs={2} >
        </Grid>
        <Grid item xs={10} >
            <Paper className={classes.backPaper}>
                <Grid container spacing={24} >
                    <Grid item xs={12} >
                        <Grid
                            container
                            alignItems={'flex-end'}
                            direction={'row'}
                            justify={'flex-start'}
                        >
                            <Typography variant="subheading" className={classes.header}>
                                Teachers 
                            </Typography>
                            <GroupAdd className={classes.header}/>
                        </Grid>
                        {props.teachers.map((v, i) => (
                            <ShowTeacher key = {i} teacher = {v}/>
                        ))}
                        
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
      </Grid>
    )
}


export default withStyles(styles)(TeacherArea)