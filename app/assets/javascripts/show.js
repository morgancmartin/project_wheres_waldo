$(document).ready(function(){
  WaldoModule.setupListeners();
});

var WaldoModule = (function(){
  var _tags = [];
  var _characters = ['Waldo', 'Wenda'];
  var _numTags = 0;

  var setupListeners = function(){
    $("img").click(_createMenu);
    $('#image-container').mouseenter(_showTags);
    $('#image-container').mouseleave(_hideTags);
  };

  var Tag = function(x,y){
    this.x = x;
    this.y = y;
    this.width = 26;
    this.height = 26;
    this.id = _tags.length;
  };

  // var clearEmptyTags = function(){
  //   $('.tag').not('[data-tag-id]')
  // };

  var _makeBlankTag = function(e) {
    new Tag(e.pageX, e.pageY).class = 'blank';
  };

  var _createMenu = function(e) {
    // _clearEmptyTags();
    var blankTag = _makeBlankTag(e);
    _drawTag(blankTag);

    var $menu = $("<select>");
    _blankOption($menu);
    for(var i in _characters){
      var $option = $('<option>').val(i).text(_characters[i]);
      $menu.append($option);
    }
    _showMenu($menu, blankTag);
    $menu.change(_menuSelect);
  };

  var _drawTag = function(tag){
    var $tagDiv = $("<div>")
        .addClass("tag")
        .attr('data-tag-id', tag.id)
        .css("left", tag.x - (tag.width/2))
        .css("top", tag.y - (tag.height/2));
    if(tag.class === 'blank') { $tagDiv.addClass('blank'); };
    $("#image-container").append($tagDiv);
  };

  var renderTags = function() {
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
      .attr('data-tag-id', tag.id)
      .appendTo($('#image-container'));
  };

  var _blankOption = function($menu) {
    var $option = $('<option>')
        .attr('disabled', 'disabled')
        .attr('selected', 'selected');
    $menu.append($option);
  };

  var _menuSelect = function(e) {
    var $menu = $(e.target);
    var tag = $('.blank');

    tag.attr('character', $menu.val());
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
          x: tag.css('left'),
          y: tag.css('top'),
          name: _characters[tag.character]
        }
      },
      success: function(tag) { _tags.push(tag); },
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
