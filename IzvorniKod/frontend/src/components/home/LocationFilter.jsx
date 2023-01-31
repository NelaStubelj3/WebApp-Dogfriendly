import React from "react";
import { RiHomeSmile2Fill } from "react-icons/ri";
import { CSSTransition } from 'react-transition-group'
import locationTypeService from "../../services/locationTypeService";
import { HomeContext } from "./HomeContext";

export default class LocationFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            locationTypes: []
        }

        this.onChange = (event) => {
            let id = Number(event.target.id)
            let tmp = this.context.locationFilter.selected;
            if(tmp.has(id))
                tmp.delete(id)
            else
                tmp.add(id)

            this.context.setLocationFilter({show: this.context.locationFilter.show, selected: tmp})
        }
    }

    componentDidMount() {
        locationTypeService.getLocationTypes().then((res) => {
            let tmp = new Set()
            for(let locationType of res.data)
                tmp.add(locationType.locationTypeId)
            this.context.setLocationFilter({selected: tmp})
            

            this.setState({locationTypes: res.data})
        })
    }

    render() {
        let checkboxes = []
        for(let locationType of this.state.locationTypes) {
            checkboxes.push(
                <span key={locationType.locationTypeId}>
                    <input key={locationType.locationTypeId} 
                        id={locationType.locationTypeId} 
                        type="checkbox" 
                        checked={this.context.locationFilter.selected.has(Number(locationType.locationTypeId))} 
                        onChange={this.onChange}/>
                    <label>{locationType.locationType}</label>
                </span>
            )
        }

        return (
             <CSSTransition in={this.context.locationFilter.show} unmountOnExit timeout={500} classNames = "location-filter-anim">
                <form className="block location-filter">
                    {checkboxes}
                </form>
            </CSSTransition>
        )
    }
}

LocationFilter.contextType = HomeContext;