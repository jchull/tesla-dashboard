import React from 'react';
import {IChargeSession} from '../../type/ChargeSession';
import {ChargeSessionCard} from './ChargeSessionCard';
import {IVehicle} from '../../type/Vehicle';
import {ChargeChart} from '../chart/ChargeChart';
import {IChargeState} from '../../type/ChargeState';
import {QueryService} from '../../service/QueryService';
import './ChargeList.css';

interface ChargeListState {
  chargeSessions: Array<IChargeSession>;
  vehicle: IVehicle;


}


export const ChargeList: React.SFC<ChargeListState> = (props: ChargeListState) => {
  const queryService = new QueryService();

  const [chargeSessions, setChargeSessions] = React.useState(props.chargeSessions);
  const [selectedSession, setSelectedSession] = React.useState({} as IChargeSession);

  const [chargeStates, setChargeStates] = React.useState([] as Array<IChargeState>);

  const chargeSelectionHandler = (session: IChargeSession) => setSelectedSession(Object.assign({}, session));


  React.useEffect(() => {
    if (selectedSession._id && props.vehicle.id_s) {
      queryService.getChargingStates(props.vehicle.id_s, selectedSession._id)
                  .then(chargingStates => {
                    setChargeStates(chargingStates);
                  });
    }
  }, [selectedSession, props.vehicle.id_s]);

  // TODO: move off props below
  return (
      <div className="charge-list-container">
        <h4>Charging</h4>
        <div className="charge-list">
          {
            props.chargeSessions.map(chargeSession =>
                <div key={chargeSession._id}
                     onClick={() => chargeSelectionHandler(chargeSession)}>
                  <ChargeSessionCard chargeSession={chargeSession}
                                     selected={selectedSession._id}/>
                </div>)
          }

        </div>
        {chargeStates && selectedSession._id ?
            <div className="charge-chart-container">
              <ChargeChart vehicle={props.vehicle}
                           session={selectedSession}
                           states={chargeStates}/>
            </div>
            : <div></div>}
      </div>
  );
};

