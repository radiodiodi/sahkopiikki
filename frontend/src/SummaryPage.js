import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';
import { get, post } from './Fetch';
import { popup } from './utils';

const backendAPI = process.env.REACT_APP_BACKEND_URL;

class SummaryPage extends Component {
  constructor() {
    super();
    this.onConfirm = this.onConfirm.bind(this);
  }
  async onConfirm() {
    const { user, product } = this.props.info;
    console.log(`Confirmed.`);
    try {
      const resp = await get(`${backendAPI}/me/`);
      await post(`${backendAPI}/transactions/`, {
        user_id: user.id,
        actor_id: resp.id,
        timestamp: new Date(),
        price: product.price,
        product_id: product.id,
      });
      this.props.advance(true);
    } catch (err) {
      if (err.throttled) return;

      console.log(err);
      popup(`Failed to send POST to backend. Check log for details.`, 'error');
    }
  }

  onReject = () => {
    console.log('Rejected!');
    this.props.advance(false);
  }

  render() {
    const { user, product } = this.props.info;
    return (
      <div className="List">
        <div className="Summary-row">
          <label>Nimi: </label>{user.user.first_name ? `${user.user.first_name} ${user.user.last_name}` : user.user.username}
        </div>
        <div className="Summary-row">
          <label>Tuote: </label>{ product.name }
        </div>
        <div className="Summary-row">
          <label>Hinta: </label>{ (product.price / 100.0).toFixed(2) }€
        </div>
        <div className="Summary-row">
          <label>Saldo ennen tapahtumaa: </label>{ user.balance }
        </div>
        <ListItem className="Success" name="Hyväksy" onClick={() => this.onConfirm()} />
        <ListItem className="Danger" name="Peruuta ja palaa alkuun" onClick={() => this.onReject()} />
      </div>
    );
  }
}

export default SummaryPage;
