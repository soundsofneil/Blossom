import React from 'react';
import Dropdown from '../common/Dropdown';

const regions = require('../../data.json').regions
let range = n => [...Array(n).keys()]

export default class RegionQuery extends React.Component {
    state = { regions: [regions[0]] } // default

    onRegionChange = ({target: {value}}, idTop) => {
        // Region dropdown
        const region = this.state.regions.filter(({id}) => id === idTop)[0]
        const newRegions = this.state.regions.filter(({id}) => id !== idTop)
        region.name = value
        newRegions.push(region)
        this.setState({ regions: newRegions })
    }

    addRegionDropdown = () => {
        const newRegions = this.state.regions
        newRegions.push({ id: this.state.regions.length })
        this.setState({ regions: newRegions })
    }

    render() {
        return (
            <div className="sign-query-box">
                <span className="subtitle noselect">What regions are you interested in?</span>
                {
                    range(this.state.regions.length).map((id) => (
                        <Dropdown key={id} onChange={(e) => this.onRegionChange(e, id)} choices={regions} />
                    ))
                }
                <div 
                    className="button-add noselect"
                    onClick={this.addRegionDropdown}>Add more...</div>
                <div 
                    className="button threequarters" 
                    onClick={() => {
                        this.props.setRegions(this.state.regions)
                        this.props.nextSignUpStep()
                    }}>Next Step</div>
            </div>
        )
    }
}