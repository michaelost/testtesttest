const testMatrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
];


const get1DMatrix = (testMatrix) => {
  return testMatrix.reduce((acc, m) => {
    acc = acc.concat(m);
    return acc;
  }, []);
}

const oneIndexes = (array) => {
  return array.reduce((acc, el, index) => parseInt(el) === 1 ? acc.concat([index]) : acc, [])
}

const getAllRows = (oneIndexes, matrixRowLength) => {
  const rows = [];
  for(let i = 0; i < oneIndexes.length; i++) {

    let current = oneIndexes[i];
    let next = oneIndexes[i+1];
    let row = [current];
    while(
      (next - current === 1) &&
      i < oneIndexes.length
    ) {
      row.push(next);
      i++;
      current = oneIndexes[i];
      next = oneIndexes[i+1];

      const endOfRow = (i + 1) % matrixRowLength === 0;
      if (endOfRow) {
        break;
      }
    }
    rows.push(row);
  }
  return rows;
};


const getAllColumns = (oneIndexes, matrix3dLength, matrixRows) => {
  const rows = [];
  for(let i = 0; i < oneIndexes.length; i++) {

    let current = oneIndexes[i];
    let next = oneIndexes[i+matrix3dLength];
    let row = [current];
    while(
      (next - current === matrix3dLength) &&
      i < oneIndexes.length
    ) {
      row.push(next);
      i++;
      current = oneIndexes[i];
      next = oneIndexes[i+matrix3dLength];

      const endOfRow = (i + 1) % matrix3dLength === 0;
      if (endOfRow) {
        break;
      }
    }
    rows.push(row);
  }
  return rows;
};


const getRectangles = (oneIndexes, matrix3dLength, matrixLength) => {
  const rectangles = [];
  const rows = getAllRows(oneIndexes, matrix3dLength);
  const columns = getAllColumns(oneIndexes,  matrix3dLength, matrixLength);
  return rows.concat(columns);
}

const getLargesRec = (recs) => {
  return recs.reduce((acc, el) => {
    let max = acc;
    if (el.length > max) {
      max = el.length;
    }
    return max;
  }, 0);

}


const matrix1d = get1DMatrix(testMatrix);
const ind = oneIndexes(matrix1d);

const rec = getRectangles(ind, testMatrix[0].length, testMatrix.length)
const largest = getLargesRec(rec)
console.log('largest', largest);
