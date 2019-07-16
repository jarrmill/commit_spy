import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class RepoManager extends Component {
  constructor() {
    super();
    this.state = {
      organization: '',
      repository: '',
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e, target) {
    this.setState({[target]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const { organization, repository} = this.state;

    this.props.handleSubmit(organization, repository);

    this.setState({ organization: '', repository: ''});
  }

  render() {
    const { organization, repository } = this.state;
    return (
      <Form>
        <FormGroup>
          <Label>Organization</Label>
          <Input type="text"
                 placeholder="organization name here"
                 value={organization}
                 onChange={(e) => this.onChange(e, 'organization')}></Input>
        </FormGroup>
        <FormGroup>
          <Label>Repository</Label>
          <Input type="text"
                 placeholder="repository"
                 value={repository}
                 onChange={(e) => this.onChange(e, 'repository')}></Input>
        </FormGroup>
        <Button onClick={(e) => this.onSubmit(e)}>Add</Button>
      </Form>
    )
  }
}

export default RepoManager;