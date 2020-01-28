import React, {Component} from "react";

export default class Films extends Component{
    render() {
        const {name, year, localized_name, rating, image_url}= this.props;
        return(
            <div className={'card'}>
                <img src={image_url} alt={'..'} className={'card-img-left'}/>
                <div className="card-body">
                    <h2 className={'card-title'}>{localized_name}</h2>
                    <p className={'card-text'}>{name}</p>
                    <p>{year}</p>
                    <p>{rating}</p>
                </div>
            </div>
        )
    }
}