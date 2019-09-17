import React, {FC, useEffect, useState} from 'react';
import {ITeslaAccount} from 'tesla-dashboard-api';
import {authenticationService, userService} from '@service/Services';
import {TeslaAccountComponent} from '@component/account/TeslaAccount';


interface TeslaAccountListProps {
  accounts: [ITeslaAccount];
}


export const TeslaAccountListComponent: FC<TeslaAccountListProps> = props => {

  const [accounts, setAccounts] = useState(props.accounts || []);
  const [selectedAccount, setSelectedAccount] = useState({} as ITeslaAccount);
  let username;

  function addTeslaAccount(){
    const newAccount = {email: ""};
    setAccounts([newAccount, ...accounts] as [ITeslaAccount]);
    setSelectedAccount(newAccount);
  }

  useEffect(() => {
    username = authenticationService.getUsername();
    if (username) {
      userService.getTeslaAccounts(username)
                 .then((data: [ITeslaAccount] | undefined) => data && setAccounts(data));
    }
  }, []);

  return (
      <div>
        <h3>Tesla Accounts</h3>
        <button onClick={() => addTeslaAccount()} disabled={selectedAccount && !selectedAccount.hasOwnProperty('_id')}>Add Account</button>
        {
          accounts ?
              (<div>
                {accounts.map(account => <div key={account.email}
                                              onClick={() => setSelectedAccount(account)}>{account.email || 'New Account'}</div>)}
              </div>)
              :
              <span>No Accounts Configured</span>
        }

        {
          selectedAccount && selectedAccount._id ?
              <TeslaAccountComponent account={selectedAccount}/>
              :
              <span>Select an Account</span>
        }
      </div>
  );
};

