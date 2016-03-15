(function (root) {
    var mazeName = document.getElementById('maze');
    var mazeButton = document.getElementById('maze-but');
    var map = root.maze[mazeName.options[mazeName.selectedIndex].value];
    var path = [1, 0];
    document.querySelector('.outer').appendChild(
        root.maze.renderMap(map, path)
    );
    mazeName.addEventListener('change', function() {
        map = root.maze[this.options[this.selectedIndex].value];
        //root.maze.renderMap(map, path);
        document.querySelector('.outer').innerHTML = '';
        document.querySelector('.outer').appendChild(
            root.maze.renderMap(map, path)
        );
    });
    mazeButton.addEventListener('click', function(){
        var outer = document.querySelector('.outer'),
            path = root.maze.solution(map, 1, 0),
            obj = root.maze.calculated(map, 1, 0),
            max;

        max = obj.step;
        outer.innerHTML = '';
        for (var i = 0; i <= max; i++) {
          (function (ind) {
            setTimeout(function () {
              document.querySelector('.outer').innerHTML = '';
              if(ind< max) {
                outer.appendChild(
                    root.maze.render(obj, ind)
                );
              }
              else {
                outer.innerHTML = '';
                outer.appendChild(
                    root.maze.render(obj, ind, path)
                );
              }
            }, 20 * ind);
          })(i);
        }
    })
})(this);
