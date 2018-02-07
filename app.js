document.addEventListener("DOMContentLoaded", function(e) {
    
    //Helper point constructor
    function Point(x,y) {
        this.x = x;
        this.y = y;
    }
    
    //Calculate the line between the points
    function Line(p1,p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    
    //Shape constructor storing points and lines connecting them
    //as own properties
    function Shape() {
        this.points = [];
        this.lines = [];
        this.init();
    }
    
    //Setting the Shape prototype
    Shape.prototype = {
        
        //Reset pointer to constructor
        constructor: Shape,
        
        //Setting this.context to point
        //to the context
        init: function() {
            if(this.context === undefined) {
                let canvas = document.getElementById('canvas');
                Shape.prototype.context = canvas.getContext('2d');
            }
        },
        
        //Drawing a shape by looping through this.points
        draw: function() {
            let i,
                ctx = this.context;
            
            ctx.strokeStyle = this.getColor();
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            
            for(i = 1; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x, this.points[i].y);
            }
            
            ctx.closePath();
            ctx.stroke();
        },
        
        //Generating the random color
        getColor: function() {
            let i,
                rgb = [];
            
            for(i = 0; i < 3; i++) {
                rgb[i] = Math.round(255 * Math.random());
            }
            return 'rgb(' + rgb.join(',') + ')';
        },
        
        //Looping through the points array
        //Creating line instances and adding them to this.lines
        getLines: function() {
            if(this.lines.length > 0) {
                return this.lines;
            }
            
            let i,
                lines = [];
            
            for(i = 0; i < this.points.length; i++) {
                lines[i] = new Line(this.points[i], this.points[i + 1] || this.points[0]);
            }
            this.lines = lines;
            return lines;
        },
        
        //Implemetation for children
        getArea: function() {},
        
        //Suming up the lengths of all lines
        getPerm: function() {
            let i,
                perim = 0,
                lines = this.getLines();
            
            for(i = 0; i < lines.length; i++) {
                perim += lines[i].length;
            }
            return perim;
        }
    };
    
});