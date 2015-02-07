(function(){
    
    'use strict';
    
    angular.module("sfl.form.wizard", [])
    
        .directive('formWizard', ['$http', function($http) {
        
            this.template = function() {
                return $http.get('angular-form-wizard-directive.html').then(function(response) { return response; });
            };
            
            this.linker = function(scope, element, attributes) {
                scope.formWizardEnabled = true;
                scope.formWizardSelectedIndex = 0;
                scope.formWizardMaxIndex = fieldsetCount;
            };
        
            return {
                restrict: 'E',
                scope: true,
                compile: function(element, attributes) {
                            
                    var navigatorHtmlPrefix = '<div class="panel-heading">';
                    var navigatorHtmlSuffix = '<div class="btn-group pull-right">' +
                        '<button class="btn btn-default" ' + 
                            'ng-click="formWizardSelectedIndex = formWizardSelectedIndex-1" ' +
                            'ng-disabled="formWizardSelectedIndex <= 0">PREV</button>' + 
                        '<button class="btn btn-default" ' + 
                            'ng-click="formWizardSelectedIndex = formWizardSelectedIndex+1" ' + 
                            'ng-disabled="formWizardSelectedIndex >= formWizardMaxIndex">NEXT</button>' + 
                        '</div><div class="clearfix"></div></div>';
                    
                    var form = element.find('form');
                    form.addClass('panel-body');
                    
                    var fieldsetTitles = [];
                    
                    angular.forEach(form.find('fieldset'), function(value, key) {
                        var fieldset = angular.element(value);
                        var legend = fieldset.find('legend');
                        fieldsetTitles.push(legend ? legend.text() : 'Step ' + (key+1));
                        fieldset.attr('data-form-wizard-index', key);
                        fieldset.attr('ng-show', 'formWizardSelectedIndex == ' + key);
                    });
                    
                    if(fieldsetTitles.length) {
                        var navigatorHtml = '<div class="btn-group pull-left">';
                        angular.forEach(fieldsetTitles, function(value, key) {
                            navigatorHtml += '<button type="button" ' + 
                                'class="btn btn-default" ' +
                                'ng-class="{ active: formWizardSelectedIndex == ' + key + ', }" ' +
                                'ng-click="formWizardSelectedIndex = ' + key + '">' + 
                                '<span class="badge">' + (key+1) + '</span>&nbsp;' + value + '</button>'
                        });
                        navigatorHtml += '</div>';
                    }
                    
                    element.prepend(navigatorHtmlPrefix + navigatorHtml + navigatorHtmlSuffix);
                    
                    form.wrap('<div class="panel panel-default"></div>');
                    
                    return function(scope, element, attributes) {
                        scope.formWizardEnabled = true;
                        scope.formWizardSelectedIndex = 0;
                        scope.formWizardMaxIndex = fieldsetTitles.length - 1;
                    };
                }
            };
        }]);
})();
