import React from 'react';

interface DriveViewState {
    name: string;
}

export class DriveView extends React.Component<DriveViewState> {

    constructor(props: DriveViewState) {
        super(props);

    }

    render() {
        return (
            <div className="driving">
          Driving View {this.props.name}
            </div>
        );
    }
}

