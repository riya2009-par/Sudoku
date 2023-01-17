import './App.css';
import {useState} from 'react';

const initial=[
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]
function App() {
  

  const[sudokuArr, setSudokuArr]=useState(getDeepCopy(initial));
  
  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }



  function onInputChange(e,row,col){
      var val=parseInt(e.target.value) || -1, grid=getDeepCopy(sudokuArr);
      if(val===-1||val>=1&&val<=9){
        grid[row][col]=val;
      }
      setSudokuArr(grid);
  }

  function resetSudoku(){
    let sudoku=getDeepCopy(initial);
    setSudokuArr(sudoku);
  }

  function compareSudoku(currentSudoku,solvedSudoku){
    let res={
      isComplete: true,
      isSolvable:true
    }
    for(var i=0;i<9;i++){
      for(var j=0;j<9;j++){
          if(currentSudoku[i][j]!=solvedSudoku[i][j]){
            if(currentSudoku[i][j]!=-1)
              res.isSolvable=false;
          }
          res.isComplete=false;
      }
    }
    return res;
  }
  function checkSudoku(){
    let sudoku=getDeepCopy(initial);
    //solver(sudoku)  //after fetching api for solvesudoku function this will be called
    let compare= compareSudoku(sudokuArr,sudoku);
    if(compare.isComplete)
      alert("Congratulations!! Solved Sudoku");
    else if(compare.isSolvable)
      alert("Keep Going!!");
    else
      alert("Can't solve Sudoku!! Try Again");
  }
  return (
    <div className="App">
      <div className="App-header">
       <h1>Sudoku Solver</h1>
       <table>
         <tbody>
           {
             [0,1,2,3,4,5,6,7,8].map((row,rIndex)=>{
              return <tr key={rIndex} className={(row+1) %3 === 0? 'bBorder' : ''}>
                {[0,1,2,3,4,5,6,7,8].map((col,cIndex)=>{

                  return <td key={rIndex + cIndex} className={(col+1) %3 === 0? 'rBorder' : ''}>
                  <input onChange={(e)=> onInputChange(e,row,col)}  
                  value={sudokuArr[row][col]===-1?'':sudokuArr[row][col]} 
                  className="cellInput"
                  disabled={initial[row][col]!==-1} />

                  </td>
                })}
              </tr>
             })
           }
         </tbody>
       </table>
       <div className="buttonContainer">
        <button className="solveButton">Solve</button>
        <button className="resetButton" onClick={resetSudoku}>Reset</button>
        <button className="checkButton" onClick={checkSudoku}>Check</button>

       </div>
      </div>
    </div>
  );
}

export default App;
