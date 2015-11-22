'use strict';

function Quarterback(name, team) {
    this.name = name;
    this.team = team;
    this.type = 'Quarterback';
    this.attempts = 0;
    this.completions = 0;
    this.totalYards = 0;
    this.touchdowns = 0;
    this.interceptions = 0;
    this.sacks = 0;
    this.longestCompletion = 0;

    this.completionPercentage = function() {
        return Math.round(this.completions / this.attempts * 100) + '%';
    };
    this.yardsPerAttempt = function() {
        return this.totalYards / this.attempts;
    };
    this.addAttempt = function(stat, yards) {
        stat = stat.toLowerCase();
        if(stat === 'touchdown') {
            this.touchdowns++;
            this.completions++;
            this.attempts++;
            this.totalYards += yards;
        }
        else if(stat === 'interception') {
            this.interceptions++;
            this.attempts++;
        }
        else if(stat === 'sack') {
            this.sacks++;
            this.totalYards += yards;
        }
        else if(stat === 'complete') {
            this.completions++;
            this.attempts++;
            this.totalYards += yards;
        }
        else if(stat === 'incomplete') {
            this.attempts++;
        }
        if(this.longestCompletion < yards) {
            this.longestCompletion = yards;
        }
    };
}

function Rushing(name, team) {
    this.name = name;
    this.team = team;
    this.type = 'Rushing';
    this.attempts = 0;
    this.totalYards = 0;
    this.over20 = 0;
    this.touchdowns = 0;
    this.firstDowns = 0;
    this.fumbles = 0;
    this.longestRush = 0;

    this.yardsPerAttempt = function() {
        return this.totalYards / this.attempts;
    };
    this.addAttempt = function(stat, yards) {
        stat = stat.toLowerCase();
        if(stat === 'fumble') {
            this.fumble++;
            this.attempts++;
        }
        else if(stat === 'first down') {
            this.firstDowns++;
            this.attempts++;
            this.totalYards += yards;
        }
        else if(stat === 'touchdown') {
            this.touchdowns++;
            this.attempts++;
            this.totalYards += yards;
        }
        else if(stat === 'rush') {
            this.attempts++;
            this.totalYards += yards;
        }
        if(yards > 20) {
            this.over20++;
        }
        if(this.longestRush < yards) {
            this.longestRush = yards;
        }
    };
}

function Kicking(name, team) {
    this.name = name;
    this.team = team;
    this.type = 'Kicking';
    this.attempts = 0;
    this.made = 0;
    this.longestFieldGoal = 0;

    this.fieldGoalPercentage = function() {
        return Math.round(this.made / this.attempts * 100) + '%';
    };
    this.addAttempt = function(stat, yards) {
        stat = stat.toLowerCase();
        if(stat === 'made') {
            this.made++;
            this.attempts++;
        }
        else if(stat === 'missed') {
            this.attempts++;
        }
        if(stat === 'made' && this.longestFieldGoal < yards) {
            this.longestFieldGoal = yards;
        }
    };
}

function displayTable() {
    $('#player-info').html('<td>' + this.type + '</td><td>' + this.name + '</td><td>' + this.team + '</td>');
}

var romo = new Quarterback('Antonio Romo', 'Dallas Cowboys');
romo.addAttempt('complete', 12);
romo.addAttempt('sack', -5);
romo.addAttempt('touchdown', 19);
romo.addAttempt('interception');
romo.completionPercentage();
romo.yardsPerAttempt();
romo.totalYards;

var bluto = new Quarterback('Bluto from Popeye', 'Comic Book Caper Shakers');
bluto.addAttempt('complete', 5);
bluto.addAttempt('sack', -2);
bluto.addAttempt('touchdown', 44);
bluto.completionPercentage();
bluto.yardsPerAttempt();
bluto.totalYards;

var emmitt = new Rushing('Emmitt Smith', 'Dallas Cowboys');
emmitt.addAttempt('complete', 16);
emmitt.addAttempt('complete', 9);
emmitt.addAttempt('fumble');
emmitt.addAttempt('touchdown', 54);
emmitt.over20;
emmitt.totalYards;
emmitt.longestRush;
emmitt.yardsPerAttempt();

var dood = new Rushing('Dood Man', 'Hipster Valley Money Kings');
dood.addAttempt('complete', 4);
dood.addAttempt('touchdown', 12);
dood.addAttempt('rush', 25);
dood.over20;
dood.totalYards;
dood.longestRush;
dood.yardsPerAttempt();

var sam = new Kicking('Sam Samuels', 'High Mountain Low Boys');
sam.addAttempt('made', 30);
sam.addAttempt('missed', 51);
sam.addAttempt('made', 42);
sam.longestFieldGoal;
sam.fieldGoalPercentage();

var bags = new Kicking('Money Bags', 'Low Rent Landlords');
bags.addAttempt('made', 39);
bags.addAttempt('made', 44);
bags.addAttempt('missed', 59);
bags.longestFieldGoal;
bags.fieldGoalPercentage();

var quarterbacks = [
    new Quarterback('Antonio Romo', 'Dallas Cowboys'),
    new Quarterback('Bluto from Popeye', 'Comic Book Caper Shakers')
]

var $table = $('<table />');
var $thead = $('<thead />');
var $tbody = $('<tbody />');

$table.append($thead);
$table.append($tbody);

var $tr = $('<tr><th>Name</th><th>Team</th><th>Attempts</th><th>Completions</th><th>Yards</th><th>Touchdowns</th><th>Interceptions</th><th>Sacks</th><th>Longest</th><th>Yards/Attempt</th>');

$thead.append($tr);

$('section').html($table);

// want to generate a table and code
function buildTableBody(qbs, $tableBody) {
    $tableBody.empty();
    for(var i = 0; i < qbs.length; i++) {
        var $tr = $('<tr />');
        var $name = $('<td />', {text: qbs[i].name});
        var $team = $('<td />', {text: qbs[i].team});
        var $attempts = $('<td />', {text: qbs[i].attempts});
        var $completions = $('<td />', {text: qbs[i].completions});
        var $yards = $('<td />', {text: qbs[i].totalYards});
        var $td = $('<td />', {text: qbs[i].touchdowns});
        var $sacks = $('<td />', {text: qbs[i].sacks});
        var $longest = $('<td />', {text: qbs[i].longestCompletion});
        var $yardsPerAttempt = $('<td />', {text: qbs[i].yardsPerAttempt()});

        $tr
            .append($name)
            .append($team)
            .append($attempts)
            .append($completions)
            .append($yards)
            .append($td)
            .append($sacks)
            .append($longest)
            .append($yardsPerAttempt);
        $tableBody.append($tr);
    }

}
