


describe("Clase GameBoard", function(){

    var canvas, ctx;

    beforeEach(function(){


	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
	board = new GameBoard();
	SpriteSheet.load (sprites,function(){});
	oldGame = Game;
    });

    afterEach(function(){
	Game = oldGame;
    }); 

it("objects", function(){
	

	obj = {};
	expect(board.objects).toEqual([]);

	board.add(obj);
	expect(board.objects.length).toEqual(1);

});		

it("overlap", function(){
	
	o1 = {x: 50, y: 50, h: 25, w:25};
	o2 = {x: 50, y: 60, h: 25, w:25};


	expect(board.overlap(o1, o2)).toBeTruthy();

	o1 = {x: 150, y: 150, h: 25, w: 25};
	o2 = {x: 50, y: 100, h: 25, w: 25};

	expect(board.overlap(o1, o2)).toBeFalsy();


});

it("draw", function(){

	
	spyOn(board, 'iterate');
	board.draw(ctx);	
	expect(board.iterate).toHaveBeenCalled();
	expect(board.iterate).toHaveBeenCalledWith('draw', ctx);


});


it("step", function(){

	spyOn(board, 'iterate');
	board.step(1);
	expect(board.iterate).toHaveBeenCalled();
	expect(board.iterate).toHaveBeenCalledWith('step',1);




});


it("iterate", function(){

	var obj = {
	    step: function (){},
	    draw: function (){}
	};
	spyOn(obj, 'step');

	board.add(obj) ;

	board.iterate('step', 5);

	expect(obj.step).toHaveBeenCalled();
	expect(obj.step).toHaveBeenCalledWith(5);


});

it("remove", function(){

	var obj = {
	    step: function (){},
	    draw: function (){}
	};
	

	board.add(obj) ;

	board.resetRemoved();
	board.remove(obj);
	board.finalizeRemoved();

	expect(board.objects).toEqual([]);

});

it("collide", function(){


	o1 = {x: 50, y: 50, h: 25, w:25};
	o2 = {x: 50, y: 60, h: 25, w:25};

	board.add(o1);
	board.add(o2);

	spyOn(board, 'detect');
	board.collide(o1);

	expect(board.detect).toHaveBeenCalled();

});



it("detect", function(){

	o1 = {x: 50, y: 50, h: 25, w:25};
	o2 = {x: 50, y: 60, h: 25, w:25};

	board.add(o1);
	board.add(o2);
	func = function() { return true};

	expect(board.detect(func)).toEqual(o1);
	expect(board.detect(func)).not.toEqual(o2);

	func = function() { return false};
	expect(board.detect(func)).toEqual(false);
});
});
/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.
*/



