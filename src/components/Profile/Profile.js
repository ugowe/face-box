import React from 'react';
import "./Profile.css";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      codename: this.props.user.codename,
      powers: this.props.user.powers
    }
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case 'user-name':
        this.setState({ name: event.target.value })
        break;
      case 'user-codename':
        this.setState({ codename: event.target.value })
        break;
      case 'user-powers':
        this.setState({ powers: event.target.value })
        break;
      default:
        return;
    }
  }

  onProfileUpdate = (data) => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ formInput: data })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304){
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data});
      }
    }).catch(console.log)
  }

  render() {
    const { user } = this.props;
    const { name, codename, powers } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib" alt="avatar" />
            <h1>{this.state.name}</h1>
            <h4>{`Images submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
            <hr />
            <label className="mt2 fw6" htmlFor="user-name">Name:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={user.name}
              type="text"
              name="user-name"
              id="name"
            />
            <label className="mt2 fw6" htmlFor="user-codename">Codename:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={user.codename}
              type="text"
              name="user-codename"
              id="codename"
            />
            <label className="mt2 fw6" htmlFor="user-powers">Powers:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={user.powers}
              type="text"
              name="user-powers"
              id="powers"
            />
            <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
              onClick={() => this.onProfileUpdate({ name, codename, powers })}>
                Save
              </button>
              <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                onClick={this.props.toggleModal}>
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
        </article>
      </div>
    );
  }
}

export default Profile;