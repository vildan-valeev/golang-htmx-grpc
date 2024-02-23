(function(){

    var api;

    htmx.defineExtension('grpc', {

        init: function (apiRef) {
            api = apiRef;
        },

        onEvent: function (name, evt) {
            if (name === "htmx:afterProcessNode" || name === "htmx:beforeProcessNode") {
                console.log("skip", name)
                return;
            }
            // TODO: import different Requests from proto and parse from params to grpc request Messages
            // const {CreateItemRequest, ReadItemRequest, UpdateItemRequest, DeleteItemRequest,GetAll} = require('./api_pb.js');
            const {BodyRequest} = require('./api_pb.js');
            const {APIServiceClient} = require('./api_grpc_web_pb.js');

            var client = new APIServiceClient('http://localhost:8080');

            var request = new BodyRequest();
            console.log(name)
            console.log(evt)
            request.setBody('some data');
            const elt = evt.detail.elt;
            const grpc_method =  elt.getAttribute("grpc-method")
            console.log(grpc_method)

            client[grpc_method](request, {}, (err, response) => {
                console.log(response.getBody())
                const swapStyle = elt.getAttribute("hx-swap");
                const target = api.getTarget(elt);
                const responseText = response.getBody();
                const settleInfo = api.makeSettleInfo(elt);
                api.selectAndSwap(swapStyle, target, elt, responseText, settleInfo)
            });
        }
    });
})();
