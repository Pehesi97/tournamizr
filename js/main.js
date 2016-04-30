(function() {
    var app = angular.module('tournamizr', []);

    app.controller('TabsController', function() {
        this.setTab = 1;

        this.isShown = function(tab) {
            return (tab === this.setTab);
        };
    });

    app.controller('TimesTabController', [ '$http', function($http) {
        var that = this;

        this.quantity = 1;
        this.players = 5;

        this.randomizing = false;
        this.createProgress = '0';

        this.jogadores = [ ];

        $http.get('data/players.json').success(function(data) {
            that.jogadores = data;
        });

        this.create = function(tabs) {
            if(that.jogadores.length == that.quantity * that.players) {
                that.randomizing = true;
                that.createProgress = '20%';
                //tabs.setTab = 2;
            }
            else {

            }
        }
    } ]);
})();
