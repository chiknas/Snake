<html>
	<head>
		<!--<meta name="viewport" content="user-scalable=0">-->

		<!--<link rel="stylesheet" type="text/css" href='static/styling.css'>-->
		<link rel="stylesheet" type="text/css" href='css/styling.css'>

		<link rel="icon" type="image/png" href="img/logo.png"/>
		<!--<h1>Nikolaos Kyknas</h1>-->

	</head>

	<body style="text-align: center;">
		<h1>Nikolaos Kyknas</h1>


		<canvas id="canvas" width="504" height="504"></canvas>

		<div id="player">
			<h1>Score</h1>
			<h2 id="score">00000000</h2>
			<button id="restart" type="button" onclick="restart()">Restart</button>

			<h2 class="hidden">Player: </h2>
			<p id="playername" class="hidden"  type="text">name</p><br><br>
		</div>




		<div id="highscore">
			<h1><u>High Scores</u></h1>
			<p id="scores">Coming...</p>
		</div>

		<div id="keypad">
			<button id="up" class="mobilekeys" type="button" onclick="keypad('up')"><i class="arrow up"></i></button><br><br>
			<button id="left" class="mobilekeys" type="button" onclick="keypad('left')" ><i class="arrow left"></i></button>
			<button id="right" class="mobilekeys" type="button" onclick="keypad('right')" ><i class="arrow right"></i></button><br><br>
			<button id="down" class="mobilekeys" type="button" onclick="keypad('down')"><i class="arrow down"></i></button>

		</div>
		
		<!--<script src="static/code.js"></script>-->
		<script src="snake.js"></script>

	</body>
</html>
