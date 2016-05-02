(function() {
    var app = angular.module('tournamizer', []);

    app.controller('TabsController', function() {
        this.setTab = 1;

        this.isShown = function(tab) {
            return (tab === this.setTab);
        };
    });

    app.controller('TimesTabController', [ '$http', '$timeout', function($http, $timeout) {
        var that = this;

        this.quantity = 3;
        this.players = 5;

        this.randomizing = 0;
        this.progress = 0;
        this.createProgress = '0';
        this.errorCreate = false;

        this.jogadores = [ ];
        this.step = 0;

        $http.get('data/players.json').success(function(data) {
            that.jogadores = data;
            that.step = that.jogadores.length / (that.quantity * that.players);
        });

        this.create = function(tabs, times) {
            if(that.jogadores.length < (that.quantity * that.players)) {
                that.errorCreate = true;
                return;
            }

            that.randomizing = 1;
            this.playerArray = [];
            this.possibleIndexes = [];
            var j;
            for(j = that.quantity; j < that.jogadores.length; j++)
            {
                this.possibleIndexes.push(j);
            }
            var i = 0, r = 0, c = 0;
            for(i = 0; i < that.quantity; i++)
            {
                this.playerArray = [ ];
                this.playerArray.push(that.jogadores[i].name);

                for(c = 1; c < that.players; c++)
                {
                    this.counter = 0;
                    r = Math.floor((Math.random() * (this.possibleIndexes.length)));
                    this.playerArray.push(that.jogadores[this.possibleIndexes[r]].name);
                    that.progress += that.step;
                    that.createProgress = that.progress + '%';
                    this.possibleIndexes.splice(r, 1);
                }
                times.addTime(this.playerArray);
            }
            that.randomizing = 2;
            tabs.setTab = 2;
        }
    } ]);

    app.controller('TimesController', function() {
        var that = this;

        function Time() {
            this.id;
            this.jogadores = [];

            this.setId = function(id) {
                this.id = id;
            }

            this.add = function(name) {
                this.jogadores.push(name);
            }

            this.print = function() {
                console.log(this.jogadores);
            }
        }

        this.times = [ ];
        this.lastId = 1;

        this.addTime = function(jogadores) {
            var time = new Time();
            time.setId(that.lastId);
            var i;
            for(i = 0; i < jogadores.length; i++)
                time.add(jogadores[i]);

            that.times.push(time);
            that.lastId++;
        }

        this.reset = function() {
            that.times = [ ];
            that.lastId = 1;
        }

    });
})();
