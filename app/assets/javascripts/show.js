$(document).ready(function(){
  WaldoModule.init();
});

var WaldoModule = (function(){
  var _tags = [];
  var _characters = ['Waldo', 'Wenda'];
  var _numTags = 0;

  var init = function() {
    setupListeners();
    _reloadTags();
  };

  var _target = {
    x: 0,
    y: 0
  };

  var setupListeners = function(){
    $("img").click(_clickHandler);
    $('#image-container').mouseenter(_showTags);
    $('#image-container').mouseleave(_hideTags);
  };

  var Tag = function(x,y,id){
    this.x = x;
    this.y = y;
    this.width = 26;
    this.height = 26;
    this.id = id;
  };

  var _reloadTags = function() {
    $.ajax({
      url: '/tags',
      method: 'GET',
      dataType: 'json',
      success: function(tags) {
        _tags = [];
        for(var i in tags){
          var tag = tags[i];
          if(tag.x && tag.y){
            _tags.push( new Tag(tag.x, tag.y, tag.id) );
          }
        }
        _renderTags();
      },
      error: function() {}
    });
  };

  var _renderTags = function() {
    for(var i in _tags){
      _drawTag(_tags[i]);
    }
  };

  var _clickHandler = function(e) {
    _clearEmptyTags();
    _target.x = e.pageX;
    _target.y = e.pageY;

    var blankTag = _makeBlankTag();
    _drawTag(blankTag);
    _createMenu();

  };

  var _clearEmptyTags = function(){
    $('.blank'). remove();
    $('select').remove();
  };

  var _makeBlankTag = function() {
    var tag = new Tag(_target.x, _target.y);
    tag.class = "blank";
    return tag;
  };

  var _createMenu = function() {
    var $menu = $("<select>");
    _blankOption($menu);
    for(var i in _characters){
      var $option = $('<option>').val(i).text(_characters[i]);
      $menu.append($option);
    }
    _showMenu($menu);
    $menu.change(_menuSelect);
  };

  var _drawTag = function(tag){
    var $tagDiv = $("<div>")
        .addClass("tag")
        .attr('data-tag-id', tag.id)
        .css("left", tag.x - (tag.width/2))
        .css("top", tag.y - (tag.height/2));
    if(tag.class === 'blank') { $tagDiv.addClass('blank'); }
    $("#image-container").append($tagDiv);
    _drawX($tagDiv);
  };

  var _drawX = function ($tagDiv) {
    var $xDiv = $('<div>')
      .addClass("x")
      .css("left", "30px")
      .css("top", "-5px")
      .text("X");
    $tagDiv.append($xDiv);
    $tagDiv.click(_closeTag);
  };

  var _closeTag = function(e) {
    $tag = $(e.target).closest('.tag');
    _ajaxTagDelete( $tag.data('tag-id') );
  };

  var _hideTags = function() {
    $('.tag').hide();
  };

  var _showTags = function() {
    $('.tag').show();
  };

  var _showMenu = function($menu) {
    $menu.css("left", _target.x - 13)
      .css("top", _target.y + 26)
      .css('position', 'absolute')
      // .attr('data-tag-id', _target.id)
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

    _target.character =  _characters[$menu.val()];
    $menu.fadeOut(1000);
    _ajaxTagCreate();
  };

  var _ajaxTagCreate = function () {
    $.ajax({
      url: '/tags',
      method: 'POST',
      dataType: 'json',
      data: {
        tag: {
          x: _target.x,
          y: _target.y,
          name: _target.character
        }
      },
      success: function(tag) {
        $('.tag .blank').removeClass('blank');
        console.log(tag);
        _tags.push( new Tag(tag.x, tag.y) );
        _clearEmptyTags();
        _renderTags();
      },
      error: function() {}
    });
  };

  return{
    init: init
  };
})();


// x:633 y:243
// x:435 y:226
// x:941 y:587
// x:450 y:415
// x:756 y:426
