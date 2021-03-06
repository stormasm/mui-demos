import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(login, name, location) {
  id += 1;
  return { id, login, name, location };
}

const data = [
  createData(
    <a href="https://github.com/stormasm">stormasm</a>,
    "Michael Angerman",
    "Corvallis, OR"
  ),
  createData(
    <a href="https://github.com/stormdock">stormdock</a>,
    "Storm Dock",
    "Santa Fe, NM"
  ),
  createData(
    <a href="https://github.com/stormreact">stormreact</a>,
    "Storm React",
    "Buenos Aires"
  )
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>login</TableCell>
            <TableCell>name</TableCell>
            <TableCell>location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell>{n.login}</TableCell>
                <TableCell>{n.name}</TableCell>
                <TableCell>{n.location}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
