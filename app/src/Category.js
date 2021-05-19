import React, { Component } from 'react';
import AppNav from './AppNav'
import Moment from 'react-moment';
import { Table, FormGroup, Button, Input, Container, Label, Form } from 'reactstrap';


class Category extends Component {
    // state = {
    //     isLoading : true,
    //     Categories : [],
    //     Expenses : []
    //   } 
      constructor(props) {
        super(props)

        this.state = {
            isLoading : true,
            Categories : [],
            Expenses : [],
            Display : []
          } 
          this.handleOnClick= this.handleOnClick.bind(this);

    }
      handleOnClick(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        let updatedExpenses = [...this.state.Expenses].filter(item => item.category.name === target.innerText);
        this.setState({Display : updatedExpenses});
      }

      async componentDidMount(){
          const response=await fetch('/api/categories')
          const body = await response.json();
          this.setState({Categories : body , isLoading : false});

          const responseExp = await fetch('/api/expenses');
          const bodyExp = await responseExp.json();
          console.log(bodyExp);
          this.setState({Expenses : bodyExp , Display : bodyExp, isLoading : false});   
      }

    render() { 
        const {Categories , isLoading, Display} = this.state;
        if(isLoading)
            return (<div>Loading...</div>)

            let rows=
            Display.map( expense =>
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.location}</td>
                    <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                    <td>{expense.category.name}</td>
                </tr>
                )


        return (<div>
            <AppNav/>

            <h2>Categories</h2><div className="category-tabs">
            {
                Categories.map(category =>
                    <Button outline color="success" id={category.id} onClick={this.handleOnClick}>
                        {category.name}
                        </Button>
                    )
            }</div>

                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4" dark>
                        <thead>
                            <tr>
                                <th width="30%">Description</th>
                                <th width="10%">Location</th>
                                <th>Date</th>                                
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>

                    </Table>
                </Container>
        </div> );
    }
}
 
export default Category;