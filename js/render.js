(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Создает HTML элемент заданного типа с заданным CSS классом
     *
     * @param {string} type тип создаваемого HTML элемента
     * @param {string} className CSS класс
     * @returns {HTMLElement} HTML элемент
     */
    function element(type, className) {
        var elem = document.createElement(type);
        elem.className = className;
        return elem;
    }

    /**
     * Создает визуализацию лабиринта по его схеме с возможностью наложения маршрута
     *
     * @param {number[][]} maze схема лабиринта
     * @param {[number, number][]} [path] маршрут
     * @returns {HTMLElement} HTML элемент
     */
    function renderMap(maze, path) {
        if (path.length) {
          maze[path[1]][path[0]] = CURRENT;
        }

        var containerElem = element('div', 'maze'),
            rowElem,
            type,
            row, 
            cell,
            x, 
            y;

        for (y = 0; y < maze.length; y++) {
            row = maze[y];
            rowElem = element('div', 'maze__row');

            for (x = 0; x < row.length; x++) {
                cell = row[x];

                switch (cell) {
                    case WALL:
                        type = 'wall';
                        break;

                    case PATH:
                        type = 'path';
                        break;

                    case CURRENT:
                        type = 'current';
                        break;

                    default:
                        type = undefined;
                }

                rowElem.appendChild(
                    element('div', 'maze__cell' + (type ? ' maze__cell_' + type : ''))
                );
            }

            containerElem.appendChild(rowElem);
        }

        return containerElem;
    }

  function render(obj, currentStep, path) {
    var map = obj.calculatedMap;

    if (path && path.length) {
      var point,
          i;

      for (i = 0; i < path.length; i++) {
        point = path[i];
        map[point[1]][point[0]] = PATH;
      }
      point = path[path.length - 1];
      map[point[1]][point[0]] = CURRENT;
    }

    var containerElem = element('div', 'maze'),
        rowElem,
        type,
        row,
        cell,
        x,
        y;

    for (y = 0; y < map.length; y++) {
      row = map[y];
      rowElem = element('div', 'maze__row');

      for (x = 0; x < row.length; x++) {
        cell = row[x];

        switch (cell) {
          case WALL:
            type = 'wall';
            break;

          case PATH:
            type = 'path';
            break;

          case CURRENT:
            type = 'current';
            break;

          default:
              if(cell > 0 && cell <= currentStep) {
                type = 'step';
              }
              else {
                type = undefined;
              }
        }

        rowElem.appendChild(
            element('div', 'maze__cell' + (type ? ' maze__cell_' + type : ''))
        );
      }

      containerElem.appendChild(rowElem);
    }

    return containerElem;


  }

    root.maze.renderMap = renderMap;
    root.maze.render = render;
})(this);
