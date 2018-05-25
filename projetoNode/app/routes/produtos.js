var http = require('http');
var porta = 3000;
var ip = "localhost";

module.exports = function(app){
    app.get('/produtos',function(req,res){

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.lista(function(err,results){
            res.render('produtos/lista', {lista:results})
        });

        connection.end();
    });
    app.get('/produtos/form', function(req,res){
        res.render('produtos/form');
    })
    app.post('/produtos/salva', function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);


        produtosDAO.salva(produto, function(err, results){
            var produto = req.body;
            console.log(req.body);
            res.render('produtos/lista');
        })
    })
}

var server = http.createServer(function(req, res) {
    console.log("Recebendo request");
    res.writeHead(    200, {'Content-Type': 'text/html'});
    res.end('<html><body>Request recebido!</body></html>');
});

server.listen(porta, ip);

console.log("Server running at http://" + ip + ":" + porta + "/");