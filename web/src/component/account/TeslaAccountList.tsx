import React, { FC, useEffect, useState } from 'react';
import { TeslaAccount } from '@model/index';
import services from '@service/service';
import { TeslaAccountComponent } from '@component/account/TeslaAccount';
import { AppState } from '@store/store';
import { useSelector } from 'react-redux';

export const TeslaAccountListComponent: FC = () => {
  const [accounts, setAccounts] = useState([] as TeslaAccount[]);
  const [selectedAccount, setSelectedAccount] = useState({} as TeslaAccount);
  const username = useSelector((store: AppState) => store.auth.username);

  function addTeslaAccount() {
    const newAccount = { email: '', username };
    setAccounts([newAccount, ...accounts]);
    setSelectedAccount(newAccount);
  }

  useEffect(() => {
    if (username) {
      services.userService
        .getTeslaAccounts(username)
        .then((data: TeslaAccount[] | undefined) => data && setAccounts(data));
    }
  }, []);

  return (
    <div>
      <h3>Tesla Accounts</h3>
      <button onClick={() => addTeslaAccount()}>Link Tesla Account</button>
      {accounts && accounts.length ? (
        <div>
          {accounts.map((account) => (
            <div
              key={account.email}
              className="clickable"
              onClick={() => setSelectedAccount(account)}
            >
              {account.email || 'New Account'}
            </div>
          ))}
        </div>
      ) : (
        <div className="messages">
          <span>
            No Accounts Configured,{' '}
            <a onClick={() => addTeslaAccount()}>link a new Tesla account</a>
          </span>
        </div>
      )}

      {selectedAccount.username ? (
        <TeslaAccountComponent account={selectedAccount} />
      ) : (
        accounts.length > 0 && <span>Select an Account</span>
      )}
    </div>
  );
};
