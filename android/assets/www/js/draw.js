(function($)
{
    $.fn.playDraw = function(options){
        // options
        var canvas = null;
        var context = null;
        
        return this.each(
            function() {
                canvas = $(this);
                console.log(canvas);
                
                context = canvas[0].getContext('2d');
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, 300, 300);
                
                var lastPoint = null;
                var time = 0;
                $.each(options.points,
                    function(index, point){
                        if (lastPoint) {
                            //code
                            setTimeout(
                                function(){
                                    context.save();
                                    
                                    context.lineWidth = 2;
                                    context.beginPath();
                                    if(options.points[index -1].x != -1 && point.x != -1){
                                        context.moveTo(options.points[index -1].x, options.points[index -1].y);
                                        context.lineTo(point.x, point.y);
                                        context.stroke();
                                        context.restore();
                                    }
                                    time = point.time;
                                }, point.time - time
                            );
                        }
                        lastPoint = point;
                    }
                );
            }
        );      
    };
    
    $.fn.recordDraw = function(options){
        // options
        var canvas = null;
        var data = {
            startTime:null,
            lastPoint : null,
            points: [],
            recording: false
        };
        
        return this.each(
            function() {
                canvas = $(this);
                console.log(canvas);
                canvas.data('recordDraw', data);
                
                context = canvas[0].getContext('2d');
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, 300, 300);                
                
                canvas.bind('mousedown',
                    function(e) {
                        //code
                        console.log('down');
                        data.recording = true;
                        if(data.startTime == null){
                            data.startTime = new Date();
                        }
                    }
                );
    
                canvas.bind('mouseup',
                    function(e) {
                        //code
                        console.log('up');
                        data.recording = false;
                        data.lastPoint = null;
                        var now = new Date();
                        var time = now - data.startTime;
                        data.points.push( { 'x': -1, 'y': -1, 'time': time} );
                    }
                )
                var self = this;
                canvas.bind('mousemove', 
                    function(e){
                        if (data.recording) {
                            //code
                            var x = e.pageX - self.offsetLeft;
                            var y = e.pageY - self.offsetTop;
                            var now = new Date();
                            var time = now - data.startTime;
                            //console.log('rel ' + x + ' x ' + y + ' : ' + time);
                            
                            var point = { 'x': x, 'y': y, 'time': time }
                            data.points.push(point);
                            
                            if (data.lastPoint) {
                                // draw
                                context.save();
                                
                                context.lineWidth = 2;
                                context.beginPath();
                                context.moveTo(data.lastPoint.x, data.lastPoint.y);
                                context.lineTo(point.x, point.y);
                                context.stroke();
                                context.restore();
                                
                                console.log(data.lastPoint.x + ' x ' + data.lastPoint.y + ' >> ' + point.x + ' x ' + point.y);
                            } else {
                    
                            }
                            data.lastPoint = point;
                        }
                    }
                );
                console.log('done');
            }
        );      
    };

})(jQuery);