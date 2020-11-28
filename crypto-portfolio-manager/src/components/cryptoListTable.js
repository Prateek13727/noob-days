import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from './circularProgress';
import Tooltip from '@material-ui/core/Tooltip';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700, 
  },
  btn__buy: {
    marginRight: '3px',
  },
  btn__sell: {
    marginRight: '3px',
  },
});

function CryptoTable(props) {
  const { classes, rows, onCryptoBuy, onCryptoSell} = props;
  if(rows.length > 0) {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
                <CustomTableCell numeric>Rank </CustomTableCell>
                <CustomTableCell>Name </CustomTableCell>
                <CustomTableCell>Symbol</CustomTableCell>
                <CustomTableCell numeric>Curculating Supply</CustomTableCell> 
                <CustomTableCell numeric>Price (INR)</CustomTableCell>
                <CustomTableCell>Buy/Sell</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              rows.map(row => {
                const { id, rank, symbol, circulating_supply, price } = row;
                return (
                  <TableRow key={id}>
                    <CustomTableCell className={classes.row} numeric>{rank}</CustomTableCell>
                    <CustomTableCell component="th" scope="row">{row.name}</CustomTableCell>
                    <CustomTableCell numeric>{symbol}</CustomTableCell>
                    <CustomTableCell numeric>{circulating_supply}</CustomTableCell>
                    <CustomTableCell numeric>{price.toFixed(2)}</CustomTableCell>
                    <CustomTableCell>
                      <Tooltip title={`Buys 1 ${symbol} for ${price.toFixed(2)}`}>
                        <Button className={classes.btn__buy} size="small" color="primary" variant="contained" onClick={onCryptoBuy.bind(this,row)} >
                          Buy
                        </Button>
                      </Tooltip>
                      <Tooltip title={`Sells 1 ${symbol} for ${price.toFixed(2)}`}>
                        <Button className={classes.btn__sell} size="small" color="secondary" variant="contained" onClick={onCryptoSell.bind(this,row)} >
                          Sell
                        </Button>
                      </Tooltip>
                    </CustomTableCell>
                  </TableRow>
               );
              })
          }
          </TableBody>
        </Table>
      </Paper>
    );
  } else {
    return (<div className="cryptoListTable__loader"><CircularProgress /></div>)
  }
}

CryptoTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CryptoTable);
