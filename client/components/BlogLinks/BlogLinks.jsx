import React, {Component} from 'react';
require('./index.css');
import LINKS from './LinksConfig';

export default class BlogLinks extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="blogLinks">
                <h1>[ 友情链接 ]</h1>
                <ul>
                    {
                        LINKS.map(({name, link}, index)=>{
                            return (
                                <li key={index}>
                                    <a href={link} target="_blank">
                                        <p className='linkTitle'>{name}</p>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}