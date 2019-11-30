import React, {FC, useEffect, useState} from 'react';
import {ITeslaAccount} from 'tesla-dashboard-api';
import services from '@service/index.ts';
import {TeslaAccountComponent} from '@component/account/TeslaAccount';


interface TeslaAccountListProps {
  accounts: [ITeslaAccount];
}


export const TeslaAccountListComponent: FC<TeslaAccountListProps> = props => {

  const [accounts, setAccounts] = useState(props.accounts || []);
  const [selectedAccount, setSelectedAccount] = useState({} as ITeslaAccount);
  let username;

  function addTeslaAccount() {
    const newAccount = {email: ''};
    setAccounts([newAccount, ...accounts] as [ITeslaAccount]);
    setSelectedAccount(newAccount);
  }

  useEffect(() => {
    username = services.auth.getUsername();
    if (username) {
      services.userService.getTeslaAccounts(username)
                 .then((data: [ITeslaAccount] | undefined) => data && setAccounts(data));
    }
  }, []);

  return (
      <div>
        <h3>Tesla Accounts</h3>
        <a onClick={() => addTeslaAccount()}>
          Add Account
        </a>
        {
          accounts && accounts.length ?
              (<div>
                {accounts.map(account => <div key={account.email}
                                              className="clickable"
                                              onClick={() => setSelectedAccount(account)}>{account.email || 'New Account'}</div>)}
              </div>)
              :
              <span>No Accounts Configured</span>
        }

        {
          selectedAccount ?
              <TeslaAccountComponent account={selectedAccount}/>
              :
              <span>Select an Account</span>
        }
      </div>
  );
};

