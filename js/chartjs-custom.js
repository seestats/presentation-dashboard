$(document).ready(function() {

    var pieData = [
        {
            value: 30,
            color: "#3277b3",
        },
        {
            value : 50,
            color : "#5cb85c"
        },
        {
            value : 100,
            color : "#d9534f"
        }

    ];

    var pieChartReal = new Chart(document.getElementById("pie").getContext("2d")).Pie(pieData);

    chartUpdate();

    setInterval(function() {
        chartUpdate();
    }, 500);
});

    function chartUpdate()
    {

        $.get(
            'http://api.seestats.org/game/smurfs',
            function (data) {
                var smurfs = data.count;

                $.get('http://api.seestats.org/game/matrix',
                    function (data) {
                        var matrix = data.count;

                        $.get('http://api.seestats.org/game/hackers',
                            function (data) {
                                var hackers = data.count;
                                        $('#pie').replaceWith('<canvas id="pie" height="400" width="600" style="width: 600px; height: 400px; float: left; display: inline"></canvas>');

                                        $('.smurf-count').html(smurfs);
                                        $('.matrix-count').html(matrix);
                                        $('.hacker-count').html(hackers);

                                        var ctx = $('#pie').get(0).getContext("2d");
                                        new Chart(ctx).Pie([
                                            {
                                                value: smurfs,
                                                color: "#3277b3",
                                            },
                                            {
                                                value : matrix,
                                                color : "#5cb85c"
                                            },
                                            {
                                                value : hackers,
                                                color : "#d9534f"
                                            }
                                        ], {
                                        animation: false
                                        });
                        }, "json");
                    }, "json");
        }, "json");

    }