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
    
    //Children constructor functions
    function Triangle(a,b,c) {
        this.points = [a,b,c];
        
        this.getArea = function() {
            let p = this.getPerm(),
                s = p / 2;
            
            return Math.sqrt(s * 
                            (s - this.lines[0].length) * 
                            (s - this.lines[1].length) * 
                            (s - this.lines[2].length));
        };
    }
    
    //Rectangle constructor receives one point (upper-left)
    //and lengths of two sides,
    //then populating its points array starting from that points
    function Rectangle(p, sideA, sideB) {
        this.points = [
            p,
            new Point(p.x + sideA, p.y),//Top right
            new Point(p.x + sideA, p.y + sideB),//Bottom right
            new Point(p.x, p.y + sideB)//Bottom left
        ];
        
        this.getArea = function() {
            return sideA * sideB;
        };
    }
    
    //Square constructor using the Triangle
    function Square(p, side) {
        Rectangle.call(this, p, side, side);
    }
    
    //Inheritance: creating a new instance of the parent
    //and setting it to child's prototype
    (function() {
        let s = new Shape();
        Triangle.prototype = s;
        Rectangle.prototype = s;
        Square.prototype = s;
    })();
    
    
    
    //Testing
    //Defining 3 points for a triangle
    let p1 = new Point(100,100),
        p2 = new Point(300,100),
        p3 = new Point(200,0);
    
    //Creating the triangle with the constructor
    let t = new Triangle(p1,p2,p3);
    
    //Drawing rectangle on canvas
    t.draw();
    console.log(t.getPerm(), t.getArea());
    
    //Drawing square on canvas
    let s = new Square(new Point(130,130), 50);
    s.draw();
    console.log(s.getArea(), s.getPerm());
    
    //Drawing square reusing triangle's point
    new Square(p1, 200).draw();
    
    
});
