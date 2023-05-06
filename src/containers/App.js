import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
// import { robots } from "./robots";
import './App.css';
import ErrorBoundary from "../components/ErrorBoundary";
import Scroll from "../components/Scroll";
// import { robots } from "./robots";

// const state = { 
//     robots: robots,
//     searchfield: ''
// }

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
        // console.log("constructor");
    }

    componentDidMount() {
        // console.log('Check');

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({robots: users});
            })

        // console.log("componentDidMount");
    }

    onSearchChange = (event) => {
        // console.log(event.target.value);
        this.setState({searchfield: event.target.value})
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
        // console.log(this.state.robots);
        // console.log("render");

        if (this.state.robots.length === 0){
            return <h1>Loading</h1>
        }else{
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;