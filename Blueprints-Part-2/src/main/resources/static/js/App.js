var MiModulo = (function () {
  var mockdata = [];
  var managerList = [];

  mockdata["johnconnor"] = [
    {
      author: "johnconnor",
      points: [
        { x: 150, y: 120 },
        { x: 215, y: 115 },
      ],
      name: "house",
    },
    {
      author: "johnconnor",
      points: [
        { x: 340, y: 240 },
        { x: 15, y: 215 },
      ],
      name: "gear",
    },
  ];

  mockdata["maryweyland"] = [
    {
      author: "maryweyland",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "house2",
    },
    {
      author: "maryweyland",
      points: [
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "gear2",
    },
  ];

  mockdata["kyleResee"] = [
    {
      author: "kyleResee",
      points: [
        { x: 3, y: 40 },
        { x: 130, y: 90 },
        { x: 140, y: 140 },
        { x: 150, y: 120 },
      ],
      name: "Dahouse",
    },
    {
      author: "kyleResee",
      points: [
        { x: 345, y: 241 },
        { x: 19, y: 243 },
        { x: 140, y: 140 },
        { x: 150, y: 120 },
      ],
      name: "DaGear",
    },
  ];

  mockdata["johnny"] = [
    {
      author: "johnny",
      points: [
        { x: 115, y: 120 },
        { x: 100, y: 190 },
        { x: 345, y: 241 },
        { x: 19, y: 243 },
      ],
      name: "Dahouse2",
    },
    {
      author: "johnny",
      points: [
        { x: 170, y: 146 },
        { x: 107, y: 109 },
        { x: 90, y: 72 },
        { x: 57, y: 287 },
      ],
      name: "DaGear2",
    },
  ];

  mockdata["ace"] = [
    {
      author: "ace",
      points: [
        { x: 145, y: 120 },
        { x: 201, y: 310 },
        { x: 140, y: 140 },
        { x: 115, y: 115 },
      ],
      name: "Dahouse3",
    },
    {
      author: "ace",
      points: [
        { x: 90, y: 72 },
        { x: 57, y: 287 },
        { x: 340, y: 240 },
        { x: 15, y: 215 },
      ],
      name: "DaGear3",
    },
    {
      author: "ace",
      points: [
        { x: 30, y: 30 },
        { x: 30, y: 90 },
        { x: 90, y: 90 },
        { x: 90, y: 300 },
        { x: 120, y: 300 },
        { x: 120, y: 90 },
        { x: 150, y: 90 },
        { x: 150, y: 30 },
        { x: 30, y: 30 },
      ],
      name: "Jaja Salu2",
    },
    
  ];

  // Variables privada
  var authorName;
  var blueprintName;
  var blueprints = [];
  var pointList = null;
  // blueprints.push({ bluprintName: "Tupla1", numberOfPoints: 10});
  // Función pública para obtener el valor de la variable privada
  function getAuthorName() {
    return authorName;
  }

  function getPointlist(){
    return pointList;
  }

  function setPointList(pointlist){
    pointList = pointlist;
  }

  function getBluePrintName(){
    return blueprintName;
  }

  function setBluePrintName(blueprintname){
    blueprintName = blueprintname;
  }

  // Función pública para establecer el valor de la variable privada
  function setAuthorName(authorname) {
    authorName = authorname;
  }

  function uptadeTable() {
    MiModulo.getBlueprintsByAuthor(authorName, getBlueprints);
  }

  function buttonFunct(button, bps) {
    
    for (var element in bps) {
      if (bps[element].name === button.id) {
        console.log("entreAlIf");
        setPointList(bps[element].points);
        setBluePrintName(bps[element].name);
        console.log(getBluePrintName());
      }
    }
  
    if (pointList) {
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
  
      var grd = ctx.createLinearGradient(0, 0, 200, 0);
      grd.addColorStop(0, "white");
      grd.addColorStop(1, "white");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, c.width, c.height);
  
      ctx.moveTo(pointList[0].x, pointList[0].y);
  
      for (var i = 1; i < pointList.length; i++) {
        var points = pointList[i];
        ctx.lineTo(points.x, points.y);
        ctx.stroke();
      }
    }
  }
  
  function captureClickEvent() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // Limpia todo el contenido del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener("click", function (event) {
      if (canvas.getAttribute("data-selected-canvas") === "true") {
        var x = event.clientX - canvas.getBoundingClientRect().left;
        var y = event.clientY - canvas.getBoundingClientRect().top;

        addPointToCurrentCanvas(x, y);
        redrawCanvas();
      }
    });
  }
  var currentCanvasPoints = [];
  function getBlueprintsByAuthor(authorName, callback) {
    fetch("/blueprints/" + authorName) // Reemplaza la URL con la ruta correcta de tu API
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        callback(data);
      })
      .catch(function (error) {
        console.error("Error fetching blueprints:", error);
      });
  }

  function getBlueprintsByNameAndAuthor(authorName, blueprintName, callback) {
    fetch("/blueprints/" + authorName + "/" + blueprintName) // Reemplaza la URL con la ruta correcta de tu API
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        callback(data);
      })
      .catch(function (error) {
        console.error("Error fetching blueprint:", error);
      });
  }

  function addPointToCurrentCanvas(x, y) {
    currentCanvasPoints.push({ x, y });
  }

  function redrawCanvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var startPoint = currentCanvasPoints[0];
    ctx.moveTo(startPoint.x, startPoint.y);

    for (var i = 1; i < currentCanvasPoints.length; i++) {
      var point = currentCanvasPoints[i];
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }

  function getBlueprints() {
    MiModulo.getBlueprintsByAuthor(authorName, function (bps) {
      console.log("Received blueprints:", bps);
      if (bps) {
        var bpMap = mapToTable(bps);
        var puntosTotales = bpMap.reduce(function (acc, current) {
          return acc + current.npointsBp; // Suma la cantidad de puntos de cada plano
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
      temp.push({ nameBp: name, npointsBp: npoints });
    }
    return temp;
  }

  function mapToTable(bps) {
    var table = document.getElementById("blueprintTable");
    var tbody = table.querySelector("tbody"); // Obtener una referencia a la fila de encabezado
    var headerRow = tbody.querySelector("tr"); // Eliminar todas las filas de datos, pero dejar la fila de encabezado intacta

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
      button.onclick = function () {
           buttonFunct(this, bps)
      };

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
  function saveBlueprint() {
    console.log(getBluePrintName());
    var canvas = document.getElementById("myCanvas");
    var author = getAuthorName();
    var name = getBluePrintName(); // Reemplaza con el nombre del plano
    var newAuthor = getAuthorName(); // Reemplaza con el nuevo autor
    var newName = getBluePrintName(); // Reemplaza con el nuevo nombre del plano
    var points = currentCanvasPoints;
    var oldPoints = getPointlist();
    var allPoints = oldPoints.concat(points);
  
    var blueprintData = {
      author: author,
      name: name,
      newAuthor: newAuthor,
      newName: newName,
      newPoints: allPoints.map(point => ({ x: parseInt(point.x), y: parseInt(point.y) }))
    };
  
    var blueprintJSON = JSON.stringify(blueprintData);
  
    // Realiza una petición PUT al API para guardar o actualizar el plano
    return $.ajax({
      url: "/blueprints/updateBp", // Ruta correcta para la actualización del plano
      type: 'PUT',
      data: blueprintJSON,
      contentType: "application/json",
      success: function () {
        console.log("Blueprint saved/updated successfully.");
        getBlueprints(); // Realiza un GET para obtener los planos actualizados
        var canvas = document.getElementById("myCanvas");
        var contexto = canvas.getContext("2d");
        // Limpia todo el contenido del canvas
        contexto.clearRect(0, 0, canvas.width, canvas.height);
          },
      error: function (error) {
        console.error("Error al guardar/actualizar el plano: " + error);
      }
    });
  }

  var nombre;

  function createNewBlueprint() {
    document.getElementById("saveNew").style.display = "inline-block";
    document.getElementById("saveUpdate").style.display = "none";
    document.getElementById("createNew").style.display = "none";
    // Limpia Pantalla
    var canvas = document.getElementById("myCanvas");
    var contexto = canvas.getContext("2d");
    // Limpia todo el contenido del canvas
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    // Pedir Nombre
    nombre = prompt("Por favor, ingrese el nombre del Plano:");
    if (nombre !== null) {
      console.log("Nombre: " + nombre);
    } else {
      console.log("El usuario canceló la entrada de información.");
    }

  }

  function saveNewBlueprint() {
    document.getElementById("saveNew").style.display = "none";
    document.getElementById("saveUpdate").style.display = "inline-block";
    document.getElementById("createNew").style.display = "inline-block";

    // Guardar Plano
    var points = currentCanvasPoints;

    var blueprintData = {
      author: "Anonymus",
      name: nombre,
      points: points.map(point => ({ x: parseInt(point.x), y: parseInt(point.y) }))
    };
  
    var blueprintJSON = JSON.stringify(blueprintData);

    return $.ajax({
      url: "/blueprints/addBp", // Ruta correcta para la creación del plano
      type: 'POST',
      data: blueprintJSON,
      contentType: "application/json",
      success: function () {
        console.log("Blueprint created successfully.");
        getBlueprints();
      },
      error: function (error) {
        console.error("Error al crear el plano: " + error);
      }
    });
  }

  function deleteBlueprint() {
    // Limpiar canvas


    // Eliminar Blueprint

    console.log(getBluePrintName());
    var canvas = document.getElementById("myCanvas");
    var author = getAuthorName();
    var name = getBluePrintName(); // Reemplaza con el nombre del plano

    return $.ajax({
      url: "/blueprints/" + author + "/" + name, // Ruta correcta para la actualización del plano
      type: 'DELETE',
      success: function () {
        console.log("Blueprint deleted successfully.");
        getBlueprints(); // Realiza un GET para obtener los planos actualizados
        var canvas = document.getElementById("myCanvas");
        var contexto = canvas.getContext("2d");
        // Limpia todo el contenido del canvas
        contexto.clearRect(0, 0, canvas.width, canvas.height);
          },
      error: function (error) {
        console.error("Error al guardar/actualizar el plano: " + error);
      }
    });

    // GET a los planos disponibles
    
  
    // Realiza una petición PUT al API para guardar o actualizar el plano
    
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
    
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,

    init: function () {
      console.info("initialized");
      var canvas = document.getElementById("myCanvas");
      canvas.setAttribute("data-selected-canvas", "false");

      canvas.addEventListener("click", function () {
        canvas.setAttribute("data-selected-canvas", "true");
      });

      captureClickEvent();
    },

    getAuthorName: getAuthorName,
    getBluePrintName:getBluePrintName,
    setAuthorName: setAuthorName,
    uptadeTable: uptadeTable,
    saveBlueprint: saveBlueprint,
    createNewBlueprint: createNewBlueprint,
    saveNewBlueprint: saveNewBlueprint,
    deleteBlueprint: deleteBlueprint
  };
})();
