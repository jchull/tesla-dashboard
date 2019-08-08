import React from 'react';
import {IChargeSession} from '../../type/ChargeSession';
import {ChargeSessionCard} from './ChargeSessionCard';
import {IVehicle} from '../../type/Vehicle';
import {ChargeChart} from '../chart/ChargeChart';
import {IChargeState} from '../../type/ChargeState';
import {QueryService} from '../../service/QueryService';

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
    if (selectedSession) {
      // @ts-ignore
      console.log(`selected session: ${selectedSession && selectedSession.start_time || 'none'}`);
      queryService.getChargingStates(props.vehicle.id_s, selectedSession._id)
                  .then(chargingStates => {
                    setChargeStates(chargingStates);

                  });
    }
  }, [selectedSession]);

  return (
      <div>

        {props.chargeSessions && props.chargeSessions.map(chargeSession =>
            <button onClick={() => chargeSelectionHandler(chargeSession)}
                    key={chargeSession._id}
            >
              <ChargeSessionCard chargeSession={chargeSession}
                                 key={chargeSession._id}
              />
            </button>)}

        {chargeStates && selectedSession._id ?
            <ChargeChart vehicle={props.vehicle}
                         session={selectedSession}
                         states={chargeStates}/>
            : <div>No Charging Data</div>}

      </div>
  );
};

