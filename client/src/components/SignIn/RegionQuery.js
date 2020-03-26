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

    onChangeRegion = ({target: {value}}, index) => {
        const half = this.state.regions.slice(0, index)
        half.push(parseInt(value))
        this.setState({ regions: half.concat(this.state.regions.slice(index+1)) })
    }

    removeRegion = (index) => {
        const newRegion = this.state.regions
        this.setState({ regions: newRegion.slice(0, index).concat(newRegion.slice(index+1))})
    }

    render() {
        return (
            <div className="sign-query-box">
                <span className="subtitle noselect">What regions are you interested in?</span>
                {
                    this.state.regions.map((i) => regions[i]).map((region, index) => (
                        <Dropdown 
                            key={index} 
                            onChange={(e) => this.onChangeRegion(e, index)} 
                            onRemove={() => this.removeRegion(index)}
                            choices={regions.filter((rgn) => !this.state.regions.includes(rgn.id) || rgn.id === region.id)} />
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