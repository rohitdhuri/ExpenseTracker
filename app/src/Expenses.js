import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import { Table, FormGroup, Button, Input, Container, Label, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import Category from './Category';
import Moment from 'react-moment';

class Expenses extends Component {

    emptyItem = {
        description : '' ,
        expensedate : new Date(),
        id: Date.now(),
        location : '',
        category : {id:1 , name:'Travel'}
    }

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            Categories : [],
            Expenses : [],
            date : new Date(),
            item : this.emptyItem
        }
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleDropChange= this.handleDropChange.bind(this);
        this.handleDateChange= this.handleDateChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const item = this.state.item;
        console.log(item);

        const response = await fetch(`/api/expenses`, {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(item),
        }).then((resp) => {
            let expense = [...this.state.Expenses, item];

            this.setState({Expenses : expense});

        });



        this.props.history.push("/expenses");
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item={...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(item);
    }

    handleDropChange(event){
        const target = event.target;
        const value = parseInt(target.value);
        const name = target.name;
        console.log(target);
        console.log(value);
        console.log(name);
        let item={...this.state.item, category : this.state.Categories[value-1]};
        // let item={...this.state.item};
         item[name] = value;
         this.setState({item});
         console.log(item);
    }

    handleDateChange(date){
        let item={...this.state.item};
        item.expensedate= date;
        this.setState({item});
        //console.log(item);
      }

    async remove(id){
        await fetch(`/api/expenses/${id}` , {
            method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(() => {
            let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
            this.setState({Expenses : updatedExpenses});
        });
    }


    async componentDidMount() {

        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({Categories : body , isLoading : false});

        const responseExp = await fetch('/api/expenses');
        
        const bodyExp = await responseExp.json();
        console.log(bodyExp);
        this.setState({Expenses : bodyExp , isLoading : false});        
    }


    render() {
        const title= <h3>Add Expense</h3>;
        const {Categories} = this.state;
        const {Expenses, isLoading} = this.state;

        if(isLoading)
            return(<div>Loading....</div>)

            let optionList = 
                Categories.map( category =>
                    <option value={category.id} key={category.id}>
                        {category.name}
                        </option>
                )
            
            let rows=
                Expenses.map( expense =>
                    <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.location}</td>
                        <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                        <td>{expense.category.name}</td>
                        <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
                    </tr>
                    )

        return ( 
            <div>
                <AppNav/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Title</Label>
                            <Input type="description" name="description" id="description" 
                                onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category" >Category</Label>
                            <select onChange={this.handleDropChange}>
                                    {optionList}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="expensedate">Date</Label>
                            <DatePicker selected={this.state.item.expensedate} onChange={this.handleDateChange}/>
                        </FormGroup>
                        
                        <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="location">Location</Label>
                            <input type="text" name="location" id="location" onChange={this.handleChange}/>
                        </FormGroup>
                        </div>

                        <FormGroup>
                            <Button color="primary" type="subimt">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>

            {''}
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4" dark>
                        <thead>
                            <tr>
                                <th width="30%">Description</th>
                                <th width="10%">Location</th>
                                <th>Date</th>                                
                                <th>Category</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>

                    </Table>
                </Container>

            </div>
         );
    }
}
 
export default Expenses;