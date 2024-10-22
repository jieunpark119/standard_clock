var $carousel = $('.carousel'),
    startX, currentX, isDragging = false,
    slideWidth = $('.carousel__slide').width(),
    rotationAngle = 0;  // Track the cumulative rotation

    $carousel.on('mousedown touchstart', function(e) {
      isDragging = true;
      startX = e.pageX || e.originalEvent.touches[0].pageX;
    });
    
    $(document).on('mousemove touchmove', function(e) {
      if (isDragging) {
        currentX = e.pageX || e.originalEvent.touches[0].pageX;
        var moveX = currentX - startX;
    
        // Rotate the carousel based on the drag movement
        // Inverting the drag rotation to fix the direction
        var dragRotation = (moveX / slideWidth) * 90;  // Adjust sensitivity and invert direction
        $carousel.css('transform', `rotateY(${rotationAngle + dragRotation}deg)`);
      }
    });
    
    $(document).on('mouseup touchend', function(e) {
      if (isDragging) {
        isDragging = false;
        currentX = e.pageX || e.changedTouches[0].pageX;
        var moveX = currentX - startX;
    
        // Update rotation angle based on movement
        // Invert the drag rotation for consistency
        var dragRotation = (moveX / slideWidth) * 90;  // Invert the direction
        rotationAngle += dragRotation;  // Add the drag rotation to the cumulative angle
    
        // Optional: Snap to 90-degree increments based on drag direction
        if (moveX < -50) {
          rotationAngle = Math.round(rotationAngle / -90) * -90;
        } else if (moveX > 50) {
          rotationAngle = Math.round(rotationAngle / -90) * -90;
        }
    
        // Apply the final rotation
        $carousel.css('transform', `rotateY(${rotationAngle}deg)`);
      }
    });

// Keyboard event listener for arrow keys
$(document).on('keydown', function(e) {
  if (e.key === "ArrowRight") {
    rotationAngle -= 90;  // Decrease angle for right arrow (clockwise rotation)
    $carousel.css('transform', `rotateY(${rotationAngle}deg)`);
  } else if (e.key === "ArrowLeft") {
    rotationAngle += 90;  // Increase angle for left arrow (counterclockwise rotation)
    $carousel.css('transform', `rotateY(${rotationAngle}deg)`);
  }
});
