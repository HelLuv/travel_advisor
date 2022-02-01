import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: 'calc(100vh - 273px)', overflow: 'auto',
  },
}));