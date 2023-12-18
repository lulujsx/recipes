import { makeStyles } from "@material-ui/styles"

export default makeStyles((theme) =>({


  [theme.breakpoints.down('sm')]: {

    mainContainer: {
      flexDirection:"column-reverse"
    }
  }

}))
