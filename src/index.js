import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/*
When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:

1. The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
2. When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
3. This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
4. Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls the Board’s handleClick(i) when clicked.
5. We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen
saying something like “this.handleClick is not a function”.

*/

/**********************This class was replaced by a function */
//class Square extends React.Component {
  //This is used to "remember" the square got clicked with state
  /*
  constructor(props){
    super(props)
    this.state ={
      squares: Array(9).fill(null),
    };
  }
  */
/*
  render() {
    return (
      //This makes the square respond when clicked
      <button 
      className="square"
      
      //onClick this sets the state of the square to whatever Board passed to square
      onClick={()=>this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
*/

//Function components are used only for components that don't have a state
function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )

}

//Board holds the values of each square in 1 place
class Board extends React.Component {
  
  //Default constructor for the board
  constructor(props) {
    super(props);
    this.state = {
      //Fills the board with no values
      squares: Array(9).fill(null),

      //This keeps track of turns
      xIsNext: true,
    };
  }
  
  //This method tells the program what to do when you click
  handleClick(i) {
    //This creates a copy of the current turn
    const squares = this.state.squares.slice();
    
    /**
     * This checks whether or not the square is filled or 
     * if a winner is declared. Prevents you from playing
     * on top of what the other player has played, and prevents
     * 5 year olds from getting their hand broken by machine arms.
     */
    if (calculateWinner(squares)||squares[i]){
      return;
    }

    //This checks what comes next
    squares[i]=this.state.xIsNext ? "X":"O";
    this.setState({
      //Sends the squares prop down to squares
      squares: squares,

      //This flips the boolean to give the next player the turn
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (<Square 

    //This stores the state of each square
    value={this.state.squares[i]}

    //This tells the board to refresh each square after every move
    onClick={() => this.handleClick(i)}
    />
    )
  }

  render() {
    /**
     * This bit checks whether or not someone has won
     */
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = "Winner: " + winner;
    }
    else{
      status = "Next player: "+ (this.state.xIsNext ? "X":"O");
    }

    /**
     * This renders the board
     */
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
/**
 * This function calculates the winner. Is called every turn to determine the winner
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

