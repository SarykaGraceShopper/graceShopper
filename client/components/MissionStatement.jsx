import React from 'react';
import { Link } from 'react-router-dom';

import history from '../history'

export default function MissionStatement() {

  return (
    <div className="row" style={{maxWidth:'800px', display: 'flex', font: 'Bookman'}}>
      <div className="col-sm-12 col-md-12 col-lg-12" >
        <p>In the magical, halcyon days of yore, before Adam Smith's grubby, oil-caked invisible hand had begun to gum up the cogs of love, all dragons, regardless of their ferocity, firepower, or finesse, were loved, cherished and protected. But, sadly, in the dark, cynical, neoliberal and sometimes even neo-nazi times in which we live, people only want dragons who can protect and destroy, leaving kind, sweet, and cute dragon individuals without a pallet to lay on, without even a runty rodent to char and chew. We here at Discount Dragons rescue these sweeties, these cuties, these defenseless huggable sometimes-fire-breathing creatures and bring them to you at a low low price, so that all dragons can find the magical, loving home that they deserve. Will you be their hero???</p>
      </div>
    </div>
  );
}
