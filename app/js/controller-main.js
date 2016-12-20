entomApp.controller('MainController', function ($scope, $timeout, $mdSidenav) {

    /**
     * versions field
     * @type {{node: number, electron: number, chromium: number}}
     */
    $scope.versions = {
        node: 0,
        electron: 0,
        chromium: 0
    };

    /**
     * db field
     */
    $scope.db = {};

    /**
     * project_name field
     * @type {string}
     */
    $scope.project_name = '';

    /**
     * projects field
     * @type {Array}
     */
    $scope.projects = [];

    /**
     * active_project_id field
     * @type {number}
     */
    $scope.active_project_id = 0;

    /**
     * init method
     */
    $scope.init = function () {
        console.log('MainController :: init');
        $scope.versions.node = process.versions.node;
        $scope.versions.chromium = process.versions.chrome;
        $scope.versions.electron = process.versions.electron;
        $scope.db = require('./app/db/projects');
        $scope.db.init();
        $scope.getAll();
    };

    /**
     * setActiveProject method
     */
    $scope.changeActiveProject = function () {
        console.log($scope.active_project_id);
    };

    /**
     * createProject method
     */
    $scope.createProject = function () {
        $scope.db.insert({
            title: $scope.project_name
        });
        $scope.project_name = '';
        $scope.getAll();
    };

    /**
     * getAll method
     */
    $scope.getAll = function () {
        $scope.db.getAll(function (rows) {
            for (let r in rows) {
                rows[r].active = false;
            }
            $scope.projects = rows;
        });
    };

    /**
     * removeProjects method
     */
    $scope.removeProjects = function () {
        for(let p in $scope.projects) {
            if($scope.projects[p].active == true) {
                $scope.removeProject($scope.projects[p].id);
            }
        }
        $scope.getAll();
    };

    /**
     * removeProject method
     * @param id
     */
    $scope.removeProject = function (id) {
        $scope.db.remove(id);
    };

    /**
     * setActiveProject method
     * @param index
     */
    $scope.setActiveProject = function (index) {
        $scope.projects[index].active = !$scope.projects[index].active;
    };

    /**
     * toggleLeft
     */
    $scope.toggleLeft = buildToggler('left');

    /**
     * toggleRight
     */
    $scope.toggleRight = buildToggler('right');

    /**
     * buildToggler method
     * @param componentId
     * @returns {Function}
     */
    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        }
    }

});