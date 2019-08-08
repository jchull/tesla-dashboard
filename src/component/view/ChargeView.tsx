import React from 'react';

interface ChargeViewState {
    display_name: string;
}

export class ChargeView extends React.Component<ChargeViewState> {

    constructor(props: ChargeViewState) {
        super(props);

    }

    render() {
        return (
            <div className="charging">
          Charging View {this.props.display_name}
            </div>
        );
    }
}

