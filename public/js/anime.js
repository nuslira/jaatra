   var path = anime.path('#motionPath path');

            var motionPath = anime({
              targets: '#motionPath .el',
              translateX: path('x'),
              translateY: path('y'),
              rotate: path('angle'),
              easing: 'linear',
              duration: 2000,
              loop: true
            });