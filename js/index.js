(function (root) {
    var mazeName = document.getElementById('maze');
    var mazeButton = document.getElementById('maze-but');
    var map = eval('root.maze.' + mazeName.options[mazeName.selectedIndex].value);
    var path;
    document.querySelector('.outer').appendChild(
        root.maze.render(map, path)
    );
    mazeName.addEventListener('change', function() {
        map = eval('root.maze.' + this.options[this.selectedIndex].value);
        root.maze.render(map, path);
        document.querySelector('.outer').innerHTML = '';
        document.querySelector('.outer').appendChild(
            root.maze.render(map, path)
        );
    });
    mazeButton.addEventListener('click', function(){
        document.querySelector('.outer').innerHTML = '';
        var path = root.maze.solution(map, 1, 0);
        document.querySelector('.outer').appendChild(
            root.maze.render(map, path)
        );
    })
})(this);
