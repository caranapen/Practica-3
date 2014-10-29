describe("Clase GameBoard", function(){

    var canvas, ctx;

    beforeEach(function(){

	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();
	oldGame = Game;
    });

    afterEach(function(){
	Game = oldGame;
    }); 

it("posicion inicial", function(){

	
	var missile = new PlayerMissile(141.5, 449);
	expect(missile.w).toEqual(2);
	expect(missile.h).toEqual(10);
	expect(missile.x).toEqual(140.5);
	expect(missile.y).toEqual(439);

});		

it("step", function(){

	var missile = new PlayerMissile(141.5, 449);
	missile.step(0.03);
	expect(missile.y).toEqual(418);
	missile.step(0.5);
	expect(missile.y).toEqual(68);

});

it("draw", function(){

	spyOn(SpriteSheet, "draw");

	var missile = new PlayerMissile(141.5, 449);
	missile.draw();
	expect(SpriteSheet.draw).toHaveBeenCalled();
 	expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
 	expect(SpriteSheet.draw.calls[0].args[2]).toEqual(140.5);
 	expect(SpriteSheet.draw.calls[0].args[3]).toEqual(439);
});


it("espacio pulsado", function(){


	var miNave = new PlayerShip();
	var board =  new GameBoard();
	board.add(miNave);
	spyOn(board, 'add');


	Game = {keys: {'fire': true}};
	
	miNave.step(0.22);
	expect(board.add).not.toHaveBeenCalled();

	miNave.step(0.04); // ya han pasado los 25 s
	expect(board.add).toHaveBeenCalled();

});
});




/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
    la clase en el prototipo

*/
