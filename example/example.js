(function() {
    'use strict';
    angular
        .module('tw.ui.combo.example', [
            'ngMaterial', 'tw.ui.combo'
        ])
        .controller('MainController', [
            '$scope',
            function($scope) {
                $scope.options = [{
                    name: 'Zhao Yu',
                    age: 34,
                    gender: 'male'
                }, {
                    name: 'Chen Min',
                    age: 30,
                    gender: 'female'
                }, {
                    name: 'Zhao Yunze',
                    age: 3,
                    gender: 'male'
                }];

                $scope.comboSelected = function(selected) {
                    $scope.selected = selected;
                    $scope.$apply(function() {
                        $scope.model = $scope.selected.name;
                    });
                    console.log(selected);
                };
            }
        ]);
})();
