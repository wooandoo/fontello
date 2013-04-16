'use strict';


/*global ko*/


N.wire.once('navigate.done', { priority: 10 }, function () {
  var $view = $('#tabs').tab();

  //
  // Bind model and view
  //

  ko.applyBindings(
    { selectedCount: N.app.fontsList.selectedCount },
    $view.get(0)
  );

  //
  // Jump to selector on resets
  //

  function jumpToSelector() {
    $view.find('a[data-target="#selector"]').tab('show');
  }

  N.wire.on('cmd:reset_all',      jumpToSelector);
  N.wire.on('cmd:reset_selected', jumpToSelector);

  //
  // Jump to selector if no selected glyphs left
  //

  N.app.fontsList.selectedCount.subscribe(function (count) {
    if (0 === count) {
      jumpToSelector();
    }
  });

  //
  // Jump to selector on startup
  //

  jumpToSelector();
});