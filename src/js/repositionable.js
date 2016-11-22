
// Moving is done by affecting .repositionable-handle, while resizing is done by affecting .repositionable.
// This allows one to have a drag bad (or dragging area) if needed.
interact('.repositionable-handle')
  .draggable({
    max: 1,
    onmove: function (event) {
      var target = event.target.parentNode;
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      container = $(".resize-container")[0];

      if (x < 0) x = 0;
      if (y < 0) y = 0 ;
      if(x + target.offsetWidth > container.offsetWidth) x = container.offsetWidth - target.offsetWidth;
      if(y + target.offsetHeight > container.offsetHeight) y = container.offsetHeight - target.offsetHeight;

      console.log(y + " + " + target.offsetHeight*2 + " > " + container.offsetHeight)

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },
    inertia: true
  });

interact('.resizable')
  .resizable({
    preserveAspectRatio: false,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });

