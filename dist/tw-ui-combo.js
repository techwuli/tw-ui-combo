(function() {
    'use strict';

    angular.module('tw.ui.combo', ['ngMaterial'])
        .directive('twUiCombo', ['$timeout', '$compile', '$document', function($timeout, $compile, $document) {

            var controller = [
                '$scope',
                function($scope) {
                    console.log($scope.twUiComboOptions);
                    console.log($scope.twUiComboSelected);
                }
            ];

            var link = function(scope, element, attrs, ngModel) {

                var delay = scope.twUiComboDelay || 500;
                var minLength = scope.twUiComboMinLength || 2;
                var timeoutPromise;

var comboContainer=angular.element('<div class="tw-ui-combo-container" />');
element.parent(comboContainer);

                var comboPlaceHolder = angular.element('<div class="tw-ui-combo-placeholder" />');
                element.after(comboPlaceHolder);

                element.on('focus', function() {
                    comboPlaceHolder.addClass('tw-ui-combo-show');
                });

                element.on('blur', function(){
                    comboPlaceHolder.removeClass('tw-ui-combo-show');
                    console.log($document[0].activeElement);
                });

                scope.$watch(function() {
                    return ngModel.$modelValue;
                }, function(newValue) {
                    if (newValue && newValue.length >= minLength) {
                        $timeout.cancel(timeoutPromise);
                        timeoutPromise = $timeout(function() {
                            console.log(newValue);

                            var result = [];
                            angular.forEach(scope.twUiComboOptions, function(option) {
                                if (option.name.indexOf(newValue) > -1) {
                                    result.push(option);
                                }
                            });

                            if (result.length === 0) {
                                comboPlaceHolder.empty();
                                return;
                            }
                            var optionHtml = '<div class="tw-ui-combo-options md-whiteframe-z1" />';
                            var optionElement = angular.element(optionHtml);

                            angular.forEach(result, function(option) {
                                var title = scope.twUiComboOptionTitle ? option[scope.twUiComboOptionTitle] : option;
                                var caption = scope.twUiComboOptionCaption ? option[scope.twUiComboOptionCaption] : '';

                                var listItemHtml = '<div class="tw-ui-combo-item"><div class="md-title">' + title + '</div>';
                                if (caption) {
                                    listItemHtml += '<div class="md-caption">' + caption + '</div>';
                                }
                                listItemHtml += '</div>';
                                var listItem = angular.element(listItemHtml);
                                listItem.on('click', function() {
                                    scope.twUiComboSelected(option);
                                });
                                $compile(listItem, scope);
                                optionElement.append(listItem);
                            });


                            $compile(optionElement, scope);
                            comboPlaceHolder.empty();
                            comboPlaceHolder.append(optionElement);


                        }, delay);
                    } else {
                        $timeout.cancel(timeoutPromise);
                        comboPlaceHolder.empty();
                    }
                });
            };

            return {
                require: 'ngModel',
                restrict: 'A',
                controller: controller,
                link: link,
                scope: {
                    twUiComboOptions: '=',
                    twUiComboSelected: '=',
                    twUiComboDelay: '@',
                    twUiComboMinLength: '@',
                    twUiComboOptionTitle: '@',
                    twUiComboOptionCaption: '@'
                },
                template: ''
            };
        }]);
})();
