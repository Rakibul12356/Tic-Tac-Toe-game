import { useState } from "react"

function Square({ value, onSquareClick }) {
    return (<button
        onClick={onSquareClick}
        className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg text-blue-500 font-bold">{value}</button>)
}
function Board({ xIsNext, onPlay, squares }) {

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `winner: ${winner}`
    } else {
        status = " Next  Player :"+" " + (xIsNext ? "X" : "O")
    }
    function handleClick(i) {
        console.log(i)
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X"
        } else {
            nextSquares[i] = "O"
        }
        onPlay(nextSquares)

    }
    return (
        <>
            <div className=" text-2xl text-white font-bold" >{status}</div>
            <div className="flex">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="flex">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="flex">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    )
}
export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [xIsNext, setXIsNext] = useState(true);
    const [currentMoves ,setCurrentMoves]=useState(0)
    const currentSquares = history[currentMoves];


    function handlePlay(nextSquares) {
        setXIsNext(!xIsNext)
        const nextHistory = [...history.slice(0,currentMoves+1),nextSquares]
        setHistory(nextHistory)
        setCurrentMoves(nextHistory.length-1)
    }


    function jumpTo(move){
        setCurrentMoves(move)
        setXIsNext(move%2 === 0)
    }

    const moves= history.map((squares,move)=>{
        let description;
        if(move > 0){
            description = ` GO to the move # ${move}`
        }else{
            description=`Go to start the game`
        }
        return(
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>
        )
    
    })
    return (
        <div className=" flex gap-4  justify-center sm:grid sm:grid-cols-1">
            <div className="bg-red-500 rounded-lg shadow-red-200 shadow-2xl p-4 ">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="bg-orange-300 p-4 rounded-lg">
                <ol>{moves }</ol>
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}  