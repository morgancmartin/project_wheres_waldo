$(document).ready(function(){
  WaldoModule.setupListeners();
});

var WaldoModule = (function(){
  var _tags = [];
  var _characters = ['waldo', 'wenda'];
  var _numTags = 0;

  var setupListeners = function(){
    $("img").click(makeTag);
    $('#image-container').mouseenter(_showTags);
    $('#image-container').mouseleave(_hideTags);
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
    console.log('x:' + tag.x + 'y:'+ tag.y);
    $("#image-container").append($newTag);
    _createMenu(tag);
  };

  var _hideTags = function() {
    $('.tag').hide();
  };

  var _showTags = function() {
    $('.tag').show();
  };

  var _showMenu = function($menu, tag) {
    $menu.css("left", tag.x - (tag.width/2))
      .css("top", tag.y + (tag.height))
      .css('position', 'absolute')
      // .css('pointer-events', 'none')
      .attr('data-tag-id', tag.id)
      .appendTo($('#image-container'));
  };

  var _blankOption = function($menu) {
    var $option = $('<option>')
        .attr('disabled', 'disabled')
        .attr('selected', 'selected');
    $menu.append($option);
  };

  var _createMenu = function(tag) {
    var $menu = $("<select>");
    _blankOption($menu);

    for(var i in _characters){
      var $option = $('<option>').val(i).text(_characters[i]);
      $menu.append($option);
    }
    _showMenu($menu, tag);
    $menu.change(_menuSelect);
  };

  var _menuSelect = function(e) {
    var $menu = $(e.target);
    var tag = _tags[$menu.data('tag-id')];

    tag.character = $menu.filter('option:selected').val();
    $menu.fadeOut(1000);
    _ajaxTagCreate(tag);
  };

  var _ajaxTagCreate = function (tag) {
    $.ajax({
      url: '/tags',
      method: 'POST',
      dataType: 'json',
      data: {
        tag: {
          x: tag.x,
          y: tag.y,
          name: _characters[tag.character]
        }
      },
      success: function(tag) { console.log(tag); },
      error: function() {}
    });
  };

  return{
    setupListeners: setupListeners
  };
})();


// x:633 y:243
// x:435 y:226
// x:941 y:587
// x:450 y:415
// x:756 y:426
