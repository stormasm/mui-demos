// Start out with demo-github-json and modify according to
// https://material-ui-next.com/demos/tables/#customized-tables

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
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  }
});

const template =
  "https://raw.githubusercontent.com/stormasm/mui-demos/master/table/src/data/";

const repoMap = {
  repo1: "html5-node-diagram.json",
  repo2: "ivy.json",
  repo3: "nodejs-sandboxed-fs.json",
  repo4: "ghme.json"
};

// CustomTableCell
const CTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class SimpleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: false,
      error: null,
      repoName: repoMap["repo3"]
    };
  }

  componentWillReceiveProps(nextProps) {
    const url = template + repoMap[nextProps.match.params.repo];

    this.setState({ isLoading: true });
    this.setState({ repoName: repoMap["repo3"] });

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Sorry, but something went wrong in demo-github-json..."
          );
        }
      })
      .then(data => this.setState({ data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ repoName: repoMap["repo3"] });

    const url = template + this.state.repoName;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Sorry, but something went wrong in demo-github-json..."
          );
        }
      })
      .then(data => this.setState({ data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { classes } = this.props;

    const hits = this.state.data.hits || [];

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CTableCell>login</CTableCell>
              <CTableCell>name</CTableCell>
              <CTableCell>location</CTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits.map((key, index) => {
              return (
                <TableRow className={classes.row} key={index}>
                  <CTableCell>
                    <a href={"https://github.com/" + key.login}>{key.login}</a>
                  </CTableCell>
                  <CTableCell>{key.name}</CTableCell>
                  <CTableCell>{key.location}</CTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
