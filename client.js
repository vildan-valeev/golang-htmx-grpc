htmx.defineExtension('grpc', {
    onEvent: function (name, evt) {
        const {BodyRequest} = require('./api_pb.js');
        const {APIServiceClient} = require('./api_grpc_web_pb.js');
        var client = new APIServiceClient('http://localhost:8080');

        var request = new BodyRequest();
        request.setBody('some data');

        client.addItem(request, {}, (err, response) => {
            console.log(response.getBody());

            return response.getBody();
        });
    }
});
