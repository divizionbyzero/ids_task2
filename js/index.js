(function (root) {
    var mazeName = document.getElementById('maze');
    var mazeButton = document.getElementById('maze-but');
    var map = root.maze[mazeName.options[mazeName.selectedIndex].value];
    var path;
    document.querySelector('.outer').appendChild(
        root.maze.render(map, path)
    );
    mazeName.addEventListener('change', function() {
        map = root.maze[this.options[this.selectedIndex].value];
        root.maze.render(map, path);
        document.querySelector('.outer').innerHTML = '';
        document.querySelector('.outer').appendChild(
            root.maze.render(map, path)
        );
    });
    mazeButton.addEventListener('click', function(){
        document.querySelector('.outer').innerHTML = '';
        var path = root.maze.solution(map, 1, 0);
        var obj = root.maze.calculated(map, 1, 0);
      var max = obj.step;
      for (var i = 0; i <= max; i++) {
        (function (ind) {
          setTimeout(function () {
            document.querySelector('.outer').innerHTML = '';
            if(ind< max) {
              document.querySelector('.outer').appendChild(
                  root.maze.my_render(obj, ind)
              );
            }
            else {
              document.querySelector('.outer').innerHTML = '';
              document.querySelector('.outer').appendChild(
                  root.maze.my_render(obj, ind, path)
              );
            }
          }, 20 * ind);
        })(i);
      }

    })
})(this);
