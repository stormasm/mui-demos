import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const template =
  "https://api.github.com/repos/stormasm/mui-card-file/contents/src/data/repos";

class CheckboxList extends React.Component {
  state = {
    checked: [],
    data: {},
    isLoading: false,
    error: null
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  componentWillReceiveProps(nextProps) {
    const url = template;

    this.setState({ isLoading: true });

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

    const url = template;

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

    const data = this.state.data;
    console.log(data);
    console.log(typeof data);

    const myary = [];

    for (const prop in data) {
      console.log(prop);
      console.log(data[prop]);
      myary.push(data[prop]);
    }

    console.log(myary);

    return (
      <div className={classes.root}>
        <List>
          {myary.map(value => (
            <ListItem
              key={value.name}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxList);
