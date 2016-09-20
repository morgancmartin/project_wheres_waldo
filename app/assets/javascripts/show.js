$(document).ready(function(){
  WaldoModule.setupListeners();
});

var WaldoModule = (function(){
  var _tags = [];
  var _characters = ['waldo', 'wenda'];
  var _numTags = 0;

  var setupListeners = function(){
    $("img").click(makeTag);
  };

  var Tag = function(x,y){
    this.x = x;
    this.y = y;
    this.width = 26;
    this.height = 26;
    this.id = _numTags;
    _numTags++;
  };

  var makeTag = function(e){
    var tag = new Tag(e.pageX, e.pageY);
    _tags.push(tag);

    var $newTag = $("<div>")
                  .addClass("tag")
                  .attr('data-tag-id', tag.id)
                  .css("left", tag.x - (tag.width/2))
                  .css("top", tag.y - (tag.height/2));
    $("#image-container").append($newTag);
    _showMenu(tag);
  };

  var _showMenu = function(tag) {
    var $menu = $("<select>");

    // blank menu item
    var $option = $('<option>')
      .attr('disabled', 'disabled')
      .attr('selected', 'selected');
    $menu.append($option);

    for(var i in _characters){
      $option = $('<option>').val(i).text(_characters[i]);
      $menu.append($option);
    }

    $menu.css("left", tag.x - (tag.width/2))
      .css("top", tag.y + (tag.height))
      .css('position', 'absolute')
      .attr('data-tag-id', tag.id)
      .appendTo($('#image-container'));

    $menu.change(_menuSelect);
  };

  var _menuSelect = function(e) {
    var $menu = $(e.target);
    var tag = _tags[$menu.data('tag-id')];

    tag.character = $menu.filter('option:selected').val();
    $menu.fadeOut(1000);
  };

  return{
    setupListeners: setupListeners
  };
})();
