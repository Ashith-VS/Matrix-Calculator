import React, { useEffect, useState } from "react";
import './MatrixGenerator.css'

const MatrixGenerator = () => {

  const [matrix1, setMatrix1] = useState({ rows: "", columns: "", data: [] })
  const [matrix2, setMatrix2] = useState({ row: "", column: "", data: [] })
  const [show, notShow] = useState(false)
  const [result, setResult] = useState([])


  const handleRow1Change = (e) => {
    const Value =Number (e.target.value);
    setMatrix1((prevState) => ({ ...prevState, rows: Value }))
  }
  const handleColumn1Change = (e) => {
    const Value = Number(e.target.value);
    setMatrix1((prevState) => ({ ...prevState, columns: Value }))
  }
  const handleRow2Change = (e) => {
    const Value =Number (e.target.value);
    setMatrix2((prevState) => ({ ...prevState, row: Value }))
  }
  const handleColumn2Change = (e) => {
    const Value = Number(e.target.value);
    setMatrix2((prevState) => ({ ...prevState, column: Value }))
  }

  const intialValueMatrix1 = () => {
    const result = [];
    for (let i = 0; i < matrix1.rows; i++) {
      const row = [];
      for (let j = 0; j < matrix1.columns; j++) {
        row.push(0);
      }
      result.push(row);
    }
    setMatrix1((prevState) => ({ ...prevState, data: result }))
  }

  const intialValueMatrics2 = () => {
    const result = [];
    for (let i = 0; i < matrix2.row; i++) {
      const row = [];
      for (let j = 0; j < matrix2.column; j++) {
        row.push(0);
      }
      result.push(row);
    }
    setMatrix2((prevState) => ({ ...prevState, data: result }))
  }

  useEffect(() => {
    intialValueMatrix1()
    intialValueMatrics2()
  }, [matrix1.rows,matrix1.columns,matrix2.row,matrix2.column])

  const handleInputChange1 = (e, i, j) => {
    const value = Number(e.target.value)
    const updatedMatrix = [...matrix1.data]
    updatedMatrix[i][j] = value
    setMatrix1((prevState) => ({ ...prevState, data: updatedMatrix }))
  }

  const handleInputChange2 = (e, i, j,) => {
    const value = Number(e.target.value)
    const updatedMatrix = [...matrix2.data]
    updatedMatrix[i][j] = value
    setMatrix2((prevState) => ({ ...prevState, data: updatedMatrix }))
  }

  const handleClicked = () => {
    if (
      matrix1.data.length > 0 &&
      matrix1.data.every((row) =>
        Array.isArray(row) &&
        row.length === matrix1.columns &&
        row.every((col) => typeof col === 'number' && !isNaN(col))
      ) &&
      matrix2.data.length > 0 &&
      matrix2.data.every((row) =>
        Array.isArray(row) &&
        row.length === matrix2.column &&
        row.every((col) => typeof col === 'number' && !isNaN(col))
      ) &&
      matrix1.columns === matrix2.row
    ) {
      notShow(true);
    } else {
      alert('Enter a valid matrix1 and matrix2 values');
    }
  };
  
  const clearState = () => { 
    setMatrix1({rows:"",columns:""})
    setMatrix2({row:"",column:""})
    notShow(false)
    setResult('')
  }

  const handleAdd = () => {
    if (
      matrix1.data &&
      matrix2.data &&
      matrix1.data.length === matrix2.data.length &&
      matrix1.data[0] &&
      matrix1.data[0].length === matrix2.data[0].length
    ) {
      const result = matrix1.data.map((row, i) =>
        row.map((col, j) => col + matrix2.data[i][j])
      );
      setResult(result);
      console.log("Addition Result", result);
    } else {
      alert("Matrices must have the same dimensions for addition");
    }
  };
  

  const handleSubtract = () => {
    if (
      matrix1.data &&
      matrix2.data &&
      matrix1.data.length === matrix2.data.length &&
      matrix1.data[0] &&
      matrix1.data[0].length === matrix2.data[0].length
    ) {
      const result = matrix1.data.map((row, i) =>
        row.map((col, j) => col - matrix2.data[i][j])
      );
      setResult(result);
      console.log("subtraction Result", result);
    } else {
      alert("Matrices must have the same dimensions for subtract");
    }
  };

  const handleMultiply = () => {
    if (matrix1.columns === matrix2.row) {
      const result = [];
      for (let i = 0; i < matrix1.rows; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2.column; j++) {
          let sum = 0;
          for (let k = 0; k < matrix1.columns; k++) {
            sum = sum + matrix1.data[i][k] * matrix2.data[k][j];
          }
          result[i][j] = sum;
        }
      }
      setResult(result);
    } else {
      alert('Matrix multiplication is not possible. Check dimensions of matrices.');
    }
  };
  

  return (
    <div className="container">
      <h1>Matrix Generator</h1>
      <div className="content"> 

        <div className="matrix1">
          <h2>matrix 1</h2>
          <label>Row :  <input
            type="text"
            className="input"
            id="item1"
            value={matrix1.rows}
            onChange={handleRow1Change}
          />
          </label>

          <label>  Column :  <input
            type="text"
            className="input"
            id="item2"
            value={matrix1.columns}
            onChange={handleColumn1Change}
          />
          </label>

           {(show && 
           <table>
            {matrix1.data.map((row, i) =>
              <tr key={i}>
                {row.map((col, j) =>
                  <td key={j}>
                    <input
                      type="text"
                      className="input"
                      id="item3"
                      value={col}
                      onChange={(e) => handleInputChange1(e, i, j)}
                    />
                  </td>)}
              </tr>)}
          </table> 
            )} 

        </div>

         <div className="matrix2">
          <h2>matrix 2</h2>
          <label>  Row : <input
            type="text"
            className="input"
            id="item4"
            value={matrix2.row}
            onChange={handleRow2Change}
          />
          </label>

          <label>  Column : <input
            type="text"
            className="input"
            id="item5"
            value={matrix2.column}
            onChange={handleColumn2Change}
          />
          </label>

          {(show &&
          <table>
            {matrix2.data.map((row, i) => (
              <tr key={i}>
                {row.map((col, j) => (
                  <td key={j}>
                    <input
                      type="text"
                      className="input"
                      id="item6"
                      value={col}
                      onChange={(e) => handleInputChange2(e, i, j)}
                    />
                  </td>))}
              </tr>))}
          </table>
          )} 

        </div>
      </div> 

       <div className="btn">
        <button onClick={handleClicked}>matrixCreator</button>
        <button onClick={clearState}>Clear</button>
      </div>

      <div className="btn">
          <button onClick={handleAdd}>Add</button>
          <button onClick={handleSubtract}>Subtract</button>
          <button onClick={handleMultiply}>Multiply</button> 
        </div>

     <div className="result">
          <h3>Results : </h3>
          {(show && result.length !== 0 &&
            <table className="resultMatrix">
              {result.map((row, i) =>
                <tr key={i}>
                  {row.map((col, j) =>
                    <td key={j}>
                      <input
                        type="text"
                        className="input"
                        id="item7"
                        value={col} />
                    </td>)}
                </tr>)}
            </table>
          )}
        </div>  

    </div >
  );
};

export default MatrixGenerator;
