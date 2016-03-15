(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;


  /**
   * Функция находит путь к выходу и возвращает найденный маршрут
   *
   * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
   * @param {number} x координата точки старта по оси X
   * @param {number} y координата точки старта по оси Y
   * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
   */
    function solution(maze, x, y) {
      var map,
          path = [],
          calcObj = getCalculatedMapLastStepExit(maze, x, y),
          i,
          j,
          step;
      map = calcObj.calculatedMap;
      i = calcObj.exit.exitI;
      j = calcObj.exit.exitJ;
      step = calcObj.step;
      // Set coordinates to exit.
      path.push([j, i]);
      while (step > 0) {
        if (checkVariant(map, i - 1, j, step)) {
          path.push([j, i - 1]);
          i--;
        }
        else if (checkVariant(map, i, j - 1, step)) {
          path.push([j - 1, i]);
          j--;
        }
        else if (checkVariant(map, i + 1, j, step)) {
          path.push([j, i + 1]);
          i++;
        }
        else if (checkVariant(map, i, j + 1, step)) {
          path.push([j + 1, i]);
          j++;
        }
        step--;
      }
      return path.reverse();
    }

    /**
     * Gets map with calculated wave, last step number and exit coordinates.
     *
     * @param {number[][]} maze
     * @param {number} x
     * @param {number} y
     * @returns {object} {{calculatedMap: {number[][]}, step: {number}, exit: {object}}
     */
    function getCalculatedMapLastStepExit(maze, x, y) {
      var map = JSON.parse(JSON.stringify(maze)),
          step = 1,
          exitI = 0, exitJ = 0,
          waveFront = [], newWaveFront = [];

      map[y][x] = step;
      newWaveFront.push([y, x]);
      do {
        waveFront = JSON.parse(JSON.stringify(newWaveFront));
        newWaveFront = [];
        for (var position = 0; position < waveFront.length; position++) {
          // Check is exit reached.
          if (waveFront[position][0] == map.length - 1) {
            exitI = waveFront[position][0];
            exitJ = waveFront[position][1];
            break;
          }

          if (checkAvailablePoint(map, waveFront[position][0] + 1, waveFront[position][1])) {
            map[waveFront[position][0] + 1][waveFront[position][1]] = step + 1;
            newWaveFront.push([waveFront[position][0] + 1, waveFront[position][1]]);
          }
          if (checkAvailablePoint(map, waveFront[position][0] - 1, waveFront[position][1])) {
            map[waveFront[position][0] - 1][waveFront[position][1]] = step + 1;
            newWaveFront.push([waveFront[position][0] - 1, waveFront[position][1]]);
          }
          if (checkAvailablePoint(map, waveFront[position][0], waveFront[position][1] + 1)) {
            map[waveFront[position][0]][waveFront[position][1] + 1] = step + 1;
            newWaveFront.push([waveFront[position][0], waveFront[position][1] + 1]);
          }
          if (checkAvailablePoint(map, waveFront[position][0], waveFront[position][1] - 1)) {
            map[waveFront[position][0]][waveFront[position][1] - 1] = step + 1;
            newWaveFront.push([waveFront[position][0], waveFront[position][1] - 1]);
          }
        }
        waveFront = [];
        step++;
      }
      while (newWaveFront.length);

      return {calculatedMap: map, step: step, exit: {exitI: exitI, exitJ: exitJ}};
    }

    /**
     * Checks the path variant.
     *
     * @param {number[][]} map
     * @param {number} i coordinate y
     * @param {number} j coordinate x
     * @param {number} step
     * @returns {boolean}
     */
    function checkVariant(map, i, j, step) {
      return (i < 0 || j < 0 || i >= map.length || j >= map[0].length || map[i][j] !== step - 1) ? false : true;
    }

    /**
     * Checks the point.
     *
     * @param {number[][]} mas
     * @param {number} i coordinate y
     * @param {number} j coordinate x
     * @returns {boolean}
     */
    function checkAvailablePoint(mas, i, j) {
      return (i < 0 || j < 0 || i >= mas.length || j >= mas[0].length || mas[i][j] !== EMPTY) ? false : true;
    }

    root.maze.solution = solution;
    root.maze.calculated = getCalculatedMapLastStepExit;
})(this);
