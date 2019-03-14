function getEmptyGrid() {
    return new Array(9).fill(null).map(() => new Array(9).fill(0));
}
function copyGrid(grid) {
    return grid.map((line) => line.map((cell) => cell));
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const n = Math.floor(Math.random() * (i + 1));
        const t = a[i];
        a[i] = a[n];
        a[n] = t
    }
    return a;
}

function validNumber(grid, row, col, number = null) {
    if (number === null) {
        const number = grid[row][col];
        if (number === 0) {
            return true;
        }
    }
    // vertical/horizontal
    for (let i = 0; i < 9; i++) {
        if ((col !== i && grid[row][i] === number) || (row !== i && grid[i][col] === number)) {
            return false;
        }
    }
    const nn = row / 3 | 0;
    const mm = col / 3 | 0;
    // 3x3 square
    for (let i = nn * 3; i < nn * 3 + 3; i++) {
        for (let j = mm * 3; j < mm * 3 + 3; j++) {
            if ((i !== row && j !== col && grid[i][j] === number)) {
                return false;
            }
        }
    }
    return true;
}


function solveUnique(grid, neededVariations = 1) {
    let variations = 0;
    grid = copyGrid(grid);
    function solve(n = 0, m = 0) {
        let [col, row] = find0(grid, n, m);
        if (col === -1) {
            variations++;
            if (variations >= neededVariations) {
                return true;
            }
            return false;
        }
        for (let i = 1; i <= 9; i++) {
            if (validNumber(grid, col, row, i)) {
                grid[col][row] = i;
                if (solve(col, row)) {
                    return true;
                }
                grid[col][row] = 0;
            }
        }
        return false;
    }

    solve();
    return variations >= neededVariations;
}

function solve(grid, n = 0, m = 0) {
    let [col, row] = find0(grid, n, m);
    if (col === -1) {
        return true;
    }
    for (let i = 1; i <= 9; i++) {
        if (validNumber(grid, col, row, i)) {
            grid[col][row] = i;
            if (solve(grid, col, row)) {
                return true;
            }
            grid[col][row] = 0;
        }
    }
    return false;
}

function find0(grid, n, m) {
    for (; n < 9; n++) {
        for (; m < 9; m++) {
            if (grid[n][m] === 0) {
                return [n, m]
            }
        }
        m = 0;
    }
    return [-1, -1];
}


function getRandomFullGrid() {
    const grid = getEmptyGrid();
    const randomPositions = shuffle(Array.from(Array(81), (_, i) => i));
    randomPositions.forEach((cellNumber, i) => {
        const row = cellNumber / 9 | 0;
        const col = cellNumber % 9;
        const randomNums = shuffle(Array.from(Array(9), (_, i) => i + 1));
        let num;
        while (num = randomNums.pop()) {
            if (validNumber(grid, row, col, num)) {
                grid[row][col] = num;
                if (solveUnique(grid)) {
                    break;
                } else {
                    grid[row][col] = 0;
                }
            }
        }
        if (grid[row][col] === 0){
            throw new Error('could not create empty grid');
        }
    });
    return grid;
}

function getGrid(){
    const solvedGrid = getRandomFullGrid();
    const grid = copyGrid(solvedGrid);
    const randomPositions = shuffle(Array.from(Array(81), (_, i) => i));
    randomPositions.forEach((cellNumber) => {
        const row = cellNumber / 9 | 0;
        const col = cellNumber % 9;
        const num = grid[row][col];
        grid[row][col] = 0;
        if (solveUnique(grid, 2)){
            grid[row][col] = num;
        }
    });
    return {grid, solvedGrid};

}
