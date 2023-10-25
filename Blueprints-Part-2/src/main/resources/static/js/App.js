var MiModulo = (function () {
    var mockdata = [];

    mockdata["johnconnor"] = [{ author: "johnconnor", "points": [{ "x": 150, "y": 120 }, { "x": 215, "y": 115 }], "name": "house" },
    { author: "johnconnor", "points": [{ "x": 340, "y": 240 }, { "x": 15, "y": 215 }], "name": "gear" }];

    mockdata["maryweyland"] = [{ author: "maryweyland", "points": [{ "x": 140, "y": 140 }, { "x": 115, "y": 115 }], "name": "house2" },
    { author: "maryweyland", "points": [{ "x": 140, "y": 140 }, { "x": 115, "y": 115 }], "name": "gear2" }];

    mockdata["kyleResee"] = [{ author: "kyleResee", "points": [{ "x": 3, "y": 40 }, { "x": 130, "y": 90 }, { "x": 140, "y": 140 }, { "x": 150, "y": 120 }], "name": "Dahouse" },
    { author: "kyleResee", "points": [{ "x": 345, "y": 241 }, { "x": 19, "y": 243 }, { "x": 140, "y": 140 }, { "x": 150, "y": 120 }], "name": "DaGear" }];

    mockdata["johnny"] = [{ author: "johnny", "points": [{ "x": 115, "y": 120 }, { "x": 100, "y": 190 }, { "x": 345, "y": 241 }, { "x": 19, "y": 243 }], "name": "Dahouse2" },
    { author: "johnny", "points": [{ "x": 170, "y": 146 }, { "x": 107, "y": 109 }, { "x": 90, "y": 72 }, { "x": 57, "y": 287 }], "name": "DaGear2" }];

    mockdata["ace"] = [{ author: "ace", "points": [{ "x": 145, "y": 120 }, { "x": 201, "y": 310 }, { "x": 140, "y": 140 }, { "x": 115, "y": 115 }], "name": "Dahouse3" },
    { author: "ace", "points": [{ "x": 90, "y": 72 }, { "x": 57, "y": 287 }, { "x": 340, "y": 240 }, { "x": 15, "y": 215 }], "name": "DaGear3" },
    { author: "ace", "points": [{ "x": 30, "y": 30 }, { "x": 30, "y": 90 }, { "x": 90, "y": 90 }, { "x": 90, "y": 300 }, 
    { "x": 120, "y": 300 }, { "x": 120, "y": 90 }, { "x": 150, "y": 90 }, { "x": 150, "y": 30 }, { "x": 30, "y": 30 }], "name": "Jaja Salu2" }];

    // Variables privada
    var authorName;
    var blueprints = [];
    // blueprints.push({ bluprintName: "Tupla1", numberOfPoints: 10});
    // Función pública para obtener el valor de la variable privada
    function getAuthorName() {
        return authorName;
    }

    // Función pública para establecer el valor de la variable privada
    function setAuthorName(authorname) {
        authorName = authorname;
    }

    function uptadeTable() {
        MiModulo.getBlueprintsByAuthor(authorName, getBlueprints);
    }

    function getBlueprints() {
        MiModulo.getBlueprintsByAuthor(authorName, function (bps) {
            console.log("Received blueprints:", bps);
            if (bps) {
                var bpMap = mapToTable(bps);
                //console.log(bpMap)

                var puntosTotales = bpMap.reduce(function (acc, current) {
                    return acc + current.points.length; // Suma la longitud de puntos
                }, 0);

                console.log("Total points:", puntosTotales);
                $("#totalPoints").text(puntosTotales);
            }
        });
    }


    function mapAuthorAndPoints(bps) {
        var temp = [];
        for (var elemento of bps) {
            var name = elemento.name;
            var npoints = elemento.points.length;
            temp.push({ nameBp: name, npointsBp: npoints })
        }
        return temp;
    }

    function mapToTable(bps) {
        var table = document.getElementById("blueprintTable");
        var tbody = table.querySelector("tbody");            // Obtener una referencia a la fila de encabezado        
        var headerRow = tbody.querySelector("tr");            // Eliminar todas las filas de datos, pero dejar la fila de encabezado intacta   

        while (tbody.rows.length > 1) {
            tbody.removeChild(tbody.lastChild);
        }

        var dct = {};

        for (var elemento of bps) {
            var author = elemento.author;
            var name = elemento.name;
            var npoints = elemento.points.length;
            var row = document.createElement("tr");
            var nameCell = document.createElement("td");
            var npointsCell = document.createElement("td");
            var buttonCell = document.createElement("td");
            var button = document.createElement("button");

            nameCell.textContent = name;
            npointsCell.textContent = npoints;

            console.log(elemento);

            button.textContent = "Open";

            button.setAttribute("id", elemento.name);
            button.onclick  = function() {buttonFunct(this, bps)};

            //button.addEventListener("click", function () {
            //    buttonFunct(elemento.points);       
            //    console.log("Realizar acciones para el blueprint:", elemento);
            //});

            row.appendChild(nameCell);
            row.appendChild(npointsCell);
            buttonCell.appendChild(button);
            row.appendChild(buttonCell);
            tbody.appendChild(row);
        }
        return bps; // Devuelve bps al final de la función    
    }

    function buttonFunct(button, bps) {

        for(var element in bps){
            if(bps[element]["name"] === button.id){
                var pointList = bps[element]["points"];
            }
        }

        console.log(pointList);

        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
    
        var grd = ctx.createLinearGradient(0, 0, 200, 0);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "white");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, c.width, c.height);

        //ctx.clearRect(0, 0, c.width, c.height);

        ctx.moveTo(pointList[0]["x"], pointList[0]["y"]);

        console.log(pointList[0]["x"], pointList[0]["y"]);

        for (var points of pointList){
            
            ctx.lineTo(points["x"], points["y"]);
            ctx.stroke();
        }        
    }


    // Asignar eventos de clic después de que se cargue el DOM
    $(document).ready(function () {
        $(".getPrintsButton").click(function () {
            var name = $(this).data("name");
            var npoints = $(this).data("npoints");
            var markup = "<tr><td>" + name + "</td><td>" + npoints + "</td></tr>";
            $("table").append(markup);
        });
    });

    return {
        getBlueprintsByAuthor: function (authname, callback) {
            callback(
                mockdata[authname]
            );
        },

        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {

            callback(
                mockdata[authname].find(function (e) { return e.name === bpname })
            );
        },
        getAuthorName: getAuthorName,
        setAuthorName: setAuthorName,
        uptadeTable: uptadeTable
    }
})();