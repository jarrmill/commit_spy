import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class RepoManager extends Component {
  constructor() {
    super();
    this.state = {
      url: '',

    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  cleanUrl(url) {
    //Split by .com so we don't have to worry about whether the user put https:// or not
    let urlArr = url.split('.com')[1].split('/');
    return { organization: urlArr[1], repository: urlArr[2] };
  }
  onChange(e) {
    this.setState({url: e.target.value});
  }
  
  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;
    const { organization, repository } = this.cleanUrl(url);
    this.props.handleSubmit(organization, repository);

    this.setState({ organization: '', repository: ''});
  }

  render() {
    const { url } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label>Add a Repository by Url:</Label>
          <Input type="text"
                 placeholder="Paste the URL of the Repo you want to follow"
                 value={url}
                 onChange={(e) => this.onChange(e)}></Input>
        </FormGroup>
        <Button onClick={(e) => this.onSubmit(e)}>Add</Button>
      </Form>
    )
  }
}

export default RepoManager;