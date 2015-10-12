
//declaring a variable // initializing angular //??
var app = angular.module('app', []);
//initializing angular // "IndexController" has to match html file //?? scope and http need to be here in order to use them later
// is there something besides those 2?
app.controller("IndexController", ['$scope', '$http', function($scope, $http){
    // initializing empty objects and arrays where we will store information later
    $scope.todo = {};
    $scope.todos = [];



    $scope.AddToDo = function (){
       // Geoff says: // Change the next line to a POST and GET
        // making a call to /add and sending (posting) event variable and time variable
        //.then runs runs after confirmation from the server --
        // router.post('/add', function(request, response, next) form INDEX.JS

        $http.post('/add', {event:$scope.todo_event, time:$scope.todo_time}).then(function(item){
            // after the database sends back JSON files, push those files to the array
            $scope.todos.push(item.data); // data means JSON info (.data is literally the data)
            console.log(item);  // item is what you get back from the server (.then(function(item))
        });

        // this is unnecessary bullshit
        //$scope.todos.push({event: $scope.todo_event, time: $scope.todo_time, done: false});
        //Everything else should be ok.

        //clearing out the form so you can create a new task
        $scope.todo_event = "";
        $scope.todo_time = "";
    };

    // get request goes to the router // router returns (item)
    $scope.getTodos = function(){
        $http.get('/todo').then(function(item){
            // then you can console.log out the item
            console.log(item);
            // assigning all of you tasks in a $scope.todos // and empty array
            $scope.todos=item.data;
        });
    };

    // this is what I am still working on. DELETE from database
    $scope.clear = function () {

        for(var it = 0; it < $scope.todos.length; it++){
            if($scope.todos[it].done){
                var id = $scope.todos[it]._id;
                $http.delete('/deleteItem/' + id).then(function(item){
                    console.log('Delete was successful (client)');
                });

            }
        }

        //console.log(todo);

            //console.log("delete" + item);

        $scope.todos = _.filter($scope.todos, function (todo) {
            return !todo.done;
        });

        //$scope.getTodos()

    };

    $scope.getTodos();

}]);