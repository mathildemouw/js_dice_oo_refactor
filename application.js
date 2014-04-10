$(function(){

  myBoard = new Board();
  myView = new DieFace(myBoard);
  myBoard.addDieEvent();
  myBoard.rollDieEvent();

});


/////////

function Die (sides){
  this.sides = sides;
  this.currentFace = sides;
  this.faceColor = '#FFFFFF';
};

Die.prototype = {
  roll: function(){
    this.currentFace = Math.floor((Math.random()*this.sides)+1);
  },
  changeColor: function(){
    this.faceColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }
};

////////

function Board (){
  this.rollArea = [];
};

Board.prototype = {

  add: function(){
    this.newDie = new Die(6);
    this.rollArea.push(this.newDie);
  },

  addDieEvent: function (){
    $('.add').on('click', function(){
      myView.showIt();
    });
  },

  rollDieEvent: function (){
    $('.roll').on('click', function(){
      myView.rollIt();
    });
  },

};

////////

function DieFace (board){
  this.board = board;
};

DieFace.prototype = {

  showIt: function(){
    this.board.add();
    $('.dice').append('<div class="die">'+this.board.newDie.currentFace+'</div>')
  },

  rollIt: function(){
    var myRollArea = this.board.rollArea;
    for(var j=0 ; j<myRollArea.length ; j++){
      myRollArea[j].roll();
      myRollArea[j].changeColor();
      $('.die').each(function(o, i){
        $(i).text(myRollArea[o].currentFace);
        $(i).css('background-color', myRollArea[o].faceColor);
      });
    };

  },

};
