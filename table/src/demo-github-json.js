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

const template =
  "https://raw.githubusercontent.com/stormasm/mui-demos/master/table/src/";

const repoMap = {
  repo1: "html5-node-diagram.json",
  repo2: "ivy.json",
  repo3: "nodejs-sandboxed-fs.json",
  repo4: "ghme.json"
};

/*
function createData(login, name, location) {
  return { login, name, location };
}

const data = [
  createData("stormasm", "Michael Angerman", "Corvallis, OR"),
  createData("stormdock", "Storm Dock", "Santa Fe, NM"),
  createData("stormreact", "Storm React", "Buenos Aires")
];
*/
class SimpleTable extends React.Component {
  constructor(props) {
    super(props);

    // const { classes } = props;

    this.state = {
      data: {},
      isLoading: false,
      error: null,
      repoName: repoMap["repo3"]
    };
  }

  componentWillReceiveProps(nextProps) {
    /*
    Do NOT Delete for awhile --- helpful for debugging...

    const locationChanged = nextProps.location !== this.props.location;
    console.log("componentWillUpdate");
    console.log("locationChanged: ", locationChanged);
    console.log(nextProps.location);
    console.log(nextProps.match.params.repo);
    console.log(nextProps.match.params.view);
    console.log(repoMap[nextProps.match.params.repo]);
*/
    const url = template + repoMap[nextProps.match.params.repo];

    this.setState({ isLoading: true });
    this.setState({ repoName: repoMap["repo3"] });

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Sorry, but something went wrong in the CardWrapper..."
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
            "Sorry, but something went wrong in the CardWrapper..."
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
              <TableCell>login</TableCell>
              <TableCell>name</TableCell>
              <TableCell>location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits.map((key, index) => {
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
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
