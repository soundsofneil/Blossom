import React from 'react';
import Dropdown from '../common/Dropdown';

const regions = require('../../data.json').regions

export default class RegionQuery extends React.Component {
    state = { regions: [0] } // default

    addRegion = () => {
        const newRegion = this.state.regions
        newRegion.push(regions.filter((rgn) => !this.state.regions.includes(rgn.id))[0].id)
        this.setState({ regions: newRegion })
    }

    onChangeRegion = ({target: {value}}, id) => {
        const newRegion = this.state.regions.map((region) => (region === id) ? parseInt(value) : region)
        this.setState({ regions: newRegion })
    }

    removeRegion = (id) => {
        const newRegion = this.state.regions.filter((region) => region !== id)
        this.setState({ regions: newRegion })
    }

    render() {
        return (
            <div className="sign-query-box">
                <span className="subtitle noselect">What regions are you interested in?</span>
                {
                    this.state.regions.map((i) => regions[i]).map((region) => (
                        <Dropdown 
                            key={region.id} 
                            onChange={(e) => this.onChangeRegion(e, region.id)} 
                            onRemove={() => this.removeRegion(region.id)}
                            choices={regions.filter((rgn) => !this.state.regions.includes(rgn.id) || rgn.id === region.id)} 
                            defaultValue={region.id} />
                    ))
                }
                <div 
                    className="button-add noselect"
                    onClick={this.addRegion}>Add more...</div>
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