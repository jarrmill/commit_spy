import React, { Component } from 'react';
import { RepoInputContainer, SearchContainer, Submit, Input } from './styles';
class RepoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',

    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLimitChange = this.onLimitChange.bind(this);
  }
  cleanUrl(url) {
    //Split by .com so we don't have to worry about whether the user put https:// or not
    let urlArr = url.split('.com')[1].split('/');
    return { organization: urlArr[1], repository: urlArr[2] };
  }
  renderOptions() {
    let options = [];
    for (var i = 1; i <= 15; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    return options;
  }
  onChange(e) {
    this.setState({url: e.target.value});
  }
  
  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;
    const { organization, repository } = this.cleanUrl(url);
    this.props.handleSubmit(organization, repository);

    this.setState({ url: '' });
  }
  onLimitChange (e) {
    this.props.handleLimitChange(e.target.value);
  }

  render() {
    const { url } = this.state;
    return (
      <RepoInputContainer>
            <div>
              <label>Add a Repository by Url:</label>
            </div>
        <SearchContainer>
            <Input type="text"
                  placeholder="Paste the URL of the Repo you want to follow"
                  value={url}
                  onChange={(e) => this.onChange(e)}></Input>
          <Submit onClick={(e) => this.onSubmit(e)}>Add</Submit>
        </SearchContainer>
        <form>
          <label>
            <span>Number of commits per repo: </span>
            <select value={this.props.displayLimit} onChange={this.onLimitChange}>
              {this.renderOptions()}
            </select>
          </label>
        </form>
      </RepoInputContainer>
    )
  }
}

export default RepoInput;