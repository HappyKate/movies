import React, {Component} from "react";

export default class Films extends Component{
    render() {
        const {name, year, localized_name, rating}= this.props;
        return(
            <div className={'card mt-3 md-3'}>
                <div className="card-body">
                    <p>{year}</p>
                    <div className={'col'}>
                        <h5 className={'card-title'}>{localized_name}</h5>
                        <p className={'card-text'}>{name}</p>
                    </div>
                    <div className={'col'}>
                        <p>{rating}</p>
                    </div>
                </div>
            </div>
        )
    }
}