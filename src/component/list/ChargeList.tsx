import React from 'react';

interface ChargeListState {
    data: object[];
    filter: object;
}

export class ChargeList extends React.Component<ChargeListState> {


    constructor(props: Readonly<ChargeListState>) {
        super(props);
    }

    render() {
        return (
            <div className="charge-list">
          charge list
            </div>
        );
    }
}

