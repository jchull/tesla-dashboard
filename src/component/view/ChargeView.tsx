import React from 'react';

interface ChargeViewState {
    name: string;
}

export class ChargeView extends React.Component<ChargeViewState> {

    constructor(props: ChargeViewState) {
        super(props);

    }

    render() {
        return (
            <div className="charging">
          Charging View {this.props.name}
            </div>
        );
    }
}

