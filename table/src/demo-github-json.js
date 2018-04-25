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

function createData(login, name, location) {
  return { login, name, location };
}

const data = [
  createData("stormasm", "Michael Angerman", "Corvallis, OR"),
  createData("stormdock", "Storm Dock", "Santa Fe, NM"),
  createData("stormreact", "Storm React", "Buenos Aires")
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
          {data.map((key, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <a href={"https://github.com/" + key.login}>{key.login}</a>
                </TableCell>
                <TableCell>{key.name}</TableCell>
                <TableCell>{key.location}</TableCell>
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
