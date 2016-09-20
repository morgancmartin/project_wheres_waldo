$(document).ready(function(){
  WaldoModule.setupListeners();
});

var WaldoModule = (function(){
  var _tags = [];
  var _characters = ['waldo', 'wenda'];

  var setupListeners = function(){
    $("img").click(makeTag);
  };

  var Tag = function(x,y){
    this.x = x;
    this.y = y;
    this.width = 26;
    this.height = 26;
  };

  var makeTag = function(e){
    var tag = new Tag(e.pageX, e.pageY);
    _tags.push(tag);

    var $newTag = $("<div>")
                  .addClass("tag")
                  .css("left", tag.x - (tag.width/2))
                  .css("top", tag.y - (tag.height/2));
    $("#image-container").append($newTag);
    showMenu(tag);
  };

  var showMenu = function(tag) {
    var $menu = $("<select>");
    for(var i in _characters){
      var $option = $('<option>').val(i).text(_characters[i]);
      $menu.append($option);
    }
    $menu.css("left", tag.x - (tag.width/2))
      .css("top", tag.y + (tag.height))
      .appendTo($('#image-container'))
      .css('position', 'absolute');
  };

  return{
    setupListeners: setupListeners
  };
})();
